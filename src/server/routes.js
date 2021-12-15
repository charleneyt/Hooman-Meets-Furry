const mysql = require("mysql");
// const e = require("express");
const config = require("./config.json");

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect();

// ********************************************
//             PET SEARCH ROUTES
// ********************************************
async function pet_search(req, res) {
  const params = [];

  // If string not empty and not undefined
  function pushIfDefined(fieldName, queryField) {
    if (queryField && queryField !== "undefined") {
      const fields = queryField.split(",");
      const queries = fields.map(
        (field) => `LOWER(${fieldName}) LIKE '%${field.toLowerCase()}%'`
      );
      params.push(`(${queries.join(" OR ")})`);
    }
  }

  // We want to separately process gender since there's an edge case
  function checkIfSame(fieldName, queryField) {
    if (queryField && queryField !== "undefined") {
      const fields = queryField.split(",");
      const queries = fields.map((field) => `${fieldName} = '${field}'`);
      params.push(`(${queries.join(" OR ")})`);
    }
  }

  checkIfSame("gender", req.query.gender);
  pushIfDefined("type", req.query.type);
  pushIfDefined("age", req.query.age);
  pushIfDefined("coat", req.query.coat);
  pushIfDefined("size", req.query.size);
  pushIfDefined("color", req.query.color);
  pushIfDefined("breed", req.query.breed);
  pushIfDefined("O.city", req.query.location);
  pushIfDefined("spayed_neutered", req.query.spayed_neutered);
  pushIfDefined("shots_current", req.query.shots_current);
  pushIfDefined("children_friendly", req.query.children_friendly);
  pushIfDefined("dogs_friendly", req.query.dogs_friendly);
  pushIfDefined("cats_friendly", req.cats_friendly);

  // If params length is zero we want an empty string, if not we join the queries
  const finalWhereQuery = params.length ? `WHERE ${params.join(" AND ")}` : "";
  let pageLimitString = "";
  if (req.query.page && !isNaN(req.query.page)) {
    const page = parseInt(req.query.page);
    const pageSize =
      req.query.pagesize && !isNaN(req.query.pagesize)
        ? parseInt(req.query.pagesize)
        : 10;
    pageLimitString = `LIMIT ${(page - 1) * pageSize},${pageSize}`;
  }
  console.log(finalWhereQuery);

  connection.query(
    `SELECT P.id, P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
       FROM Pet P JOIN Organization O on P.organization_id = O.id ${finalWhereQuery}
       ${pageLimitString}
       `,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({results: []});
      } else if (results) {
        res.json({results});
      } else {
        res.json({results: []});
      }
    }
  );
}

// ********************************************
//             RESCUE-SPECIFIC ROUTES
// ********************************************

// Route 1 (handler)
// Returns an array of information about a rescue, specified by organization_id
async function rescues(req, res) {
  const {id} = req.query;
  const {page} = req.query;
  const pagesize = req.query.pagesize ? req.query.pagesize : 10;

  if (req.query.id) {
    if (req.query.page && !isNaN(req.query.page)) {
      const offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString();
      const query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                WHERE O.id = '${id}'
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                LIMIT ${pagesize} OFFSET ${offset};
            `;
      connection.query(query, (error, results, fields) => {
        if (error) {
          console.log(error);
          res.json({error});
        } else if (results) {
          res.json({results});
        }
      });
    } else {
      const query = `
            SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
            FROM Organization O JOIN Pet P on P.organization_id = O.id
            WHERE P.organization_id = '${id}'
            GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type;
            `;
      connection.query(query, (error, results, fields) => {
        if (error) {
          console.log(error);
          res.json({error});
        } else if (results) {
          res.json({results});
        }
      });
    }
  } else if (req.query.page && !isNaN(req.query.page)) {
    const offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString();
    const query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                LIMIT ${pagesize} OFFSET ${offset};
            `;
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({error});
      } else if (results) {
        res.json({results});
      }
    });
  } else {
    const query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type;
            `;
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({error});
      } else if (results) {
        res.json({results});
      }
    });
  }
}

// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 2 (handler)
// Return an array of selected attributes for rescues that match the search query
// Return an array with all rescues that match the constraints. If no rescue satisfies the constraints, return an empty array without causing an error
async function search_rescues(req, res) {
  const city = req.query.city;
  const state = req.query.state;
  const type = req.query.type;

  // we want to push the query string inside this array
  const params = [];

  // check these two parameters if they are empty/undefined
  if (city && city !== "undefined") {
    params.push(`O.City LIKE '%${city}%'`);
  }
  if (state && state !== "undefined") {
    params.push(`O.State LIKE '%${state}%'`);
  }
  if (type && type !== "undefined") {
    params.push(`P.type LIKE '%${type}%'`);
  }

  // then we want to check if the params length is 0
  // if it is 0 then we don't want to add anything
  // if it is over 0 we want to add a "WHERE" for start
  // and join each string with "AND" // update from OR to AND
  const whereQuery = params.length ? `WHERE ${params.join(" AND ")}` : "";

  // pagination
  let pageLimitString = "";
  if (req.query.page && !isNaN(req.query.page)) {
    const page = parseInt(req.query.page);
    const pageSize =
      req.query.pagesize && !isNaN(req.query.pagesize)
        ? parseInt(req.query.pagesize)
        : 10;
    pageLimitString = `LIMIT ${(page - 1) * pageSize},${pageSize}`;
  }

  connection.query(
    `
                SELECT P.organization_id, O.name, O.address, O.city AS city, O.state AS state, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                ${whereQuery}
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name;
                ${pageLimitString}
            `,
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({results: []});
      } else if (results) {
        res.json({results});
      } else {
        res.json({results: []});
      }
    }
  );
}
// ********************************************
//             TOP 10 Cat/Dog Breeds
// ********************************************

// Route d (handler)
async function top10(req, res) {
  // default the feature to affectionate_with_family
  const feature = req.query.feature
    ? req.query.feature
    : "affectionate_with_family";

  // updated for efficiency
  connection.query(
    `SELECT DISTINCT breed_name, ${feature} AS feature_rating, photo
    FROM Breeds_Rating BR JOIN breed_with_photo BP ON BR.breed_name = BP.breed
    WHERE BP.type = '${req.query.type}'
    ORDER BY ${feature} DESC
    LIMIT 10;`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({error});
      } else if (results) {
        res.json({results});
      }
    }
  );
}

// ********************************************
//               Pet Comparing
// ********************************************

// Route e (handler)
async function compare(req, res) {
  // not necessary - just used for testing
  const username = req.params.username ? req.params.username : "testuser";

  connection.query(
    `SELECT LB.pet_id, P.name, type, breed, color, age, gender, P.photo, O.city AS location
                        FROM Pet P
                        JOIN Liked_by LB on P.id = LB.pet_id
                        JOIN Organization O on O.id = P.organization_id
                        WHERE username = '${username}'
                        LIMIT 3`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({error});
      } else if (results) {
        res.json({results});
      }
    }
  );
}

// ********************************************
//             RECOMMENDING SYSTEM ROUTES
// ********************************************

// Query b - recommend pets with certain breed featuers to the user
async function recommend(req, res) {
  const input_feature = req.query.input_feature
    ? req.query.input_feature
    : "general_health";
  const type = req.query.type ? req.query.type : "cat";

  if (req.query.page && !isNaN(req.query.page)) {
    // pagination
    const pagesize = req.query.pagesize ? req.query.pagesize : 10;
    const start = (req.query.page - 1) * pagesize;
    const rowNum = pagesize;

    const q = `WITH Temp AS (
            SELECT DISTINCT ${input_feature} FROM Breeds_Rating ORDER BY ${input_feature} DESC LIMIT 2), 
            Breeds_Name AS (
            SELECT breed_name FROM Breeds_Rating WHERE ${input_feature} IN (SELECT * FROM Temp))
            SELECT P.id, P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
            FROM Pet P
            JOIN Breeds_Name BN on P.breed = BN.breed_name
            JOIN Organization O on P.organization_id = O.id
            WHERE type = '${type}'
            LIMIT ${start}, ${rowNum};`;

    connection.query(q, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({error});
      } else if (results) {
        res.json({results});
      }
    });
  } else {
    const q = `WITH Temp AS (
            SELECT DISTINCT ${input_feature} FROM Breeds_Rating ORDER BY ${input_feature} DESC LIMIT 2), 
            Breeds_Name AS (
            SELECT breed_name FROM Breeds_Rating WHERE ${input_feature} IN (SELECT * FROM Temp))
            SELECT P.id, P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
            FROM Pet P
            JOIN Breeds_Name BN on P.breed = BN.breed_name
            JOIN Organization O on P.organization_id = O.id
            WHERE type = '${type}';`;

    connection.query(q, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({error});
      } else if (results) {
        res.json({results});
      }
    });
  }
}

// ********************************************
//             FIND-SIMILAR-PETS ROUTES
// ********************************************

// Query f - find similar pets based on pets already liked by the user
async function get_similar(req, res) {
  // TODO: default user is for testing purpose only
  const username = req.query.username ? req.query.username : "testuser";

  const type = req.query.type ? req.query.type : "Dog";

  if (req.query.page && !isNaN(req.query.page)) {
    // pagination
    const pagesize = req.query.pagesize ? req.query.pagesize : 10;
    const start = (req.query.page - 1) * pagesize;
    const rowNum = pagesize;

    // added P.id <> LP.id to avoid recommending the same pet
    const q = `WITH Liked_pet AS (
            SELECT P.id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
            FROM Pet P
            JOIN Liked_by Lb on P.id = Lb.pet_id
            JOIN Organization O on O.id = P.organization_id
            WHERE username = '${username}'
            AND type = '${type}'
            )
            SELECT DISTINCT P.id, P.organization_id, P.type, P.breed, P.color, P.age, P.gender, P.name, P.photo, O.city AS location
            FROM Pet P JOIN Organization O ON P.organization_id = O.id
            JOIN Liked_pet LP on P.type = LP.type
            WHERE P.color LIKE LP.color
            AND O.city = LP.location
            AND P.id <> LP.id
            LIMIT ${start}, ${rowNum};`;

    connection.query(q, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({error});
      } else if (results) {
        res.json({results});
      }
    });
  } else {
    const q = `WITH Liked_pet AS (
            SELECT P.id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
            FROM Pet P
            JOIN Liked_by Lb on P.id = Lb.pet_id
            JOIN Organization O on O.id = P.organization_id
            WHERE username = '${username}'
            AND type = '${type}'
            )
            SELECT DISTINCT P.id, P.organization_id, P.type, P.breed, P.color, P.age, P.gender, P.name, P.photo, O.city AS location
            FROM Pet P JOIN Organization O ON P.organization_id = O.id
            JOIN Liked_pet LP on P.type = LP.type
            WHERE P.color LIKE LP.color
            AND O.city = LP.location
            AND P.id <> LP.id;`;

    connection.query(q, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({error});
      } else if (results) {
        res.json({results});
      }
    });
  }
}

// ********************************************
//             USER LOGIN ROUTES
// ********************************************

// Query g - retrieve username based on the login information
async function user_login(req, res) {
  const email = req.query.email ? req.query.email : "testemail@gmail.com";
  const password = req.query.password ? req.query.password : "testpassword";

  const q = `SELECT username, email
    FROM User
    WHERE email = '${email}' AND password = '${password}';`;

  connection.query(q, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({error});
    } else if (results) {
      res.json({results});
    }
  });
}

// ********************************************
// GET ALL BREEDS (no / or & in between) ROUTES
// ********************************************
async function get_all_breeds(req, res) {
  const type = req.query.type ? req.query.type : "Cat";

  const q = `SELECT DISTINCT breed_name
  FROM Breeds_Rating JOIN Pet on Breeds_Rating.breed_name = Pet.breed
  WHERE breed_name NOT LIKE '%/%' AND type = '${type}';
  `;
  connection.query(q, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({error});
    } else if (results) {
      res.json({results});
    }
  });
}

// ********************************************
// GET ALL COLORS (no / or & in between) ROUTES
// ********************************************
async function get_all_colors(req, res) {
  const type = req.query.type ? req.query.type : "Cat";

  const q = `SELECT DISTINCT color
  FROM Pet
  WHERE color NOT LIKE '%/%' AND color NOT LIKE '%(%' AND color NOT LIKE '%)%' AND color NOT LIKE '%&%' AND type = '${type}';
  `;
  connection.query(q, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({error});
    } else if (results) {
      res.json({results});
    }
  });
}

// ********************************************
// GET ALL Information by PetId
// ********************************************
async function get_all_info(req, res) {
  const id = req.params.id;

  const q = `SELECT P.id AS pet_id, type, breed, color, age, gender, size, coat, spayed_neutered, house_trained, special_needs, shots_current, children_friendly, dogs_friendly, cats_friendly, P.name AS pet_name, P.photo AS pet_photo, O.id AS org_id, O.name AS org_name, email, phone, address, city, state, zipcode, country, website, O.photo AS org_photo, facebook, twitter, youtube, instagram, pinterest
  FROM Pet P JOIN Organization O on P.organization_id = O.id
  WHERE P.id = '${id}';
  `;
  console.log(q, id);
  connection.query(q, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({error});
    } else if (results) {
      res.json({results});
    }
  });
}

// ********************************************
// POST request for adding favorite pet
// ********************************************
async function mark_favorite(req, res) {
  const user = req.body.user;
  const id = req.body.id;
  const q = `INSERT INTO Liked_by (username, pet_id) VALUES ('${user}', '${id}');
  `;
  connection.query(q, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({error});
    } else if (results) {
      res.json({results});
      console.log(res);
    }
  });
}

// ********************************************
// GET All distinct pets liked by a user
// ********************************************
async function get_all_pets_liked_by_user(req, res) {
  const username = req.query.username;

  const q = `SELECT DISTINCT pet_id
  FROM Liked_by
  WHERE username = '${username}';
  `;
  connection.query(q, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({error});
    } else if (results) {
      res.json({results});
    }
  });
}

// ********************************************
// POST request for deleting a favorite pet
// ********************************************
async function delete_favorite(req, res) {
  // console.log("this is body!!!!!!!!"+ req.body);
  const user = req.body.user;
  const id = req.body.id;
  const q = `DELETE FROM Liked_by WHERE username = '${user}' AND pet_id = '${id}';
  `;
  connection.query(q, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({error});
    } else if (results) {
      res.json({results});
    }
  });
}

module.exports = {
  pet_search,
  rescues,
  search_rescues,
  top10,
  compare,
  recommend,
  get_similar,
  user_login,
  get_all_breeds,
  get_all_colors,
  get_all_info,
  mark_favorite,
  get_all_pets_liked_by_user,
  delete_favorite,
};
