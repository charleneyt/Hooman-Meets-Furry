const config = require("./config.json");
const mysql = require("mysql");
const e = require("express");

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
      params.push(`${fieldName} LIKE '%${queryField}%'`);
    }
  }

  pushIfDefined("type", req.query.type);
  pushIfDefined("gender", req.query.gender);
  pushIfDefined("color", req.query.color);
  pushIfDefined("breed", req.query.breed);
  pushIfDefined("O.city", req.query.location);
  pushIfDefined("spayed_neutered", req.query.spayed_neutered);
  pushIfDefined("shots_current", req.query.shots_current);
  pushIfDefined("children_friendly", req.query.children_friendly);
  pushIfDefined("dogs_friendly", req.query.dogs_friendly);
  pushIfDefined("cats_friendly", req.cats_friendly);

  // If params length is zero we want an empty string, if not we join the queries
  const finalWhereQuery = params.length ? "WHERE " + params.join(" AND ") : "";
  let pageLimitString = "";
  if (req.query.page && !isNaN(req.query.page)) {
    const page = parseInt(req.query.page);
    const pageSize =
      req.query.pagesize && !isNaN(req.query.pagesize)
        ? parseInt(req.query.pagesize)
        : 10;
    pageLimitString = "LIMIT " + (page - 1) * pageSize + "," + pageSize;
  }

  connection.query(
    `SELECT P.id, P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
       FROM Pet P JOIN Organization O on P.organization_id = O.id ${finalWhereQuery}
       ${pageLimitString}
       `,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ results: [] });
      } else if (results) {
        res.json({ results: results });
      } else {
        res.json({ results: [] });
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
  const id = req.query.id;
  const page = req.query.page;
  const pagesize = req.query.pagesize ? req.query.pagesize : 10;

  if (req.query.id) {
    if (req.query.page && !isNaN(req.query.page)) {
      var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString();
      var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                WHERE O.id = '${id}'
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                LIMIT ${pagesize} OFFSET ${offset};
            `;
      connection.query(query, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      });
    } else {
      var query = `
            SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
            FROM Organization O JOIN Pet P on P.organization_id = O.id
            WHERE P.organization_id = '${id}'
            GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type;
            `;
      connection.query(query, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      });
    }
  } else {
    if (req.query.page && !isNaN(req.query.page)) {
      var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString();
      var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                LIMIT ${pagesize} OFFSET ${offset};
            `;
      connection.query(query, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      });
    } else {
      var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type;
            `;
      connection.query(query, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      });
    }
  }
}

// ********************************************
//             SEARCH ROUTES
// ********************************************

// TODO: delete this comment or delete uncomment
// Route 2 (handler)
// Return an array of selected attributes for rescues that match the search query
// Return an array with all rescues that match the constraints. If no rescue satisfies the constraints, return an empty array without causing an error
async function search_rescues(req, res) {
  const city = req.query.City;
  const state = req.query.State;

  // we want to push the query string inside this array
  const params = [];

  // check these two parameters if they are empty/undefined
  if (city && city !== "undefined") {
    params.push(`O.city LIKE '%${city}%'`);
  }
  if (state && state !== "undefined") {
    params.push(`O.state LIKE '%${state}%'`);
  }

  // then we want to check if the params length is 0
  // if it is 0 then we don't want to add anything
  // if it is over 0 we want to add a "WHERE" for start
  // and join each string with "AND"
  const whereQuery = params.length ? "WHERE " + params.join(" AND ") : "";

  // pagination
  let pageLimitString = "";
  if (req.query.page && !isNaN(req.query.page)) {
    const page = parseInt(req.query.page);
    const pageSize =
      req.query.pagesize && !isNaN(req.query.pagesize)
        ? parseInt(req.query.pagesize)
        : 10;
    pageLimitString = "LIMIT " + (page - 1) * pageSize + "," + pageSize;
  }

  connection.query(
    `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                ${whereQuery}
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name;
                ${pageLimitString}
            `,
    function (error, results) {
      if (error) {
        console.log(error);
        res.json({ results: [] });
      } else if (results) {
        res.json({ results: results });
      } else {
        res.json({ results: [] });
      }
    }
  );

  // const City = req.query.City
  // const State = req.query.State
  // const page = req.query.page
  // const pagesize = req.query.pagesize ? req.query.pagesize : 10
  // if (req.query.City && req.query.State) {
  //   if (req.query.page && !isNaN(req.query.page)) {
  //     var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString()
  //     var query = `
  //               SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
  //               FROM Organization O JOIN Pet P on P.organization_id = O.id
  //               WHERE O.city LIKE '%${City}%'
  //                   AND O.state LIKE '%${State}%'
  //               GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
  //               ORDER BY O.name
  //               LIMIT ${pagesize} OFFSET ${offset};
  //           `
  //     connection.query(query, function (error, results, fields) {
  //       if (error) {
  //         console.log(error)
  //         res.json({ error: error })
  //       } else if (results) {
  //         res.json({ results: results })
  //       }
  //     })
  //   } else {
  //     var query = `
  //               SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
  //               FROM Organization O JOIN Pet P on P.organization_id = O.id
  //               WHERE O.city LIKE '%${City}%'
  //                   AND O.state LIKE '%${State}%'
  //               GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
  //               ORDER BY O.name;
  //           `
  //     connection.query(query, function (error, results, fields) {
  //       if (error) {
  //         console.log(error)
  //         res.json({ error: error })
  //       } else if (results) {
  //         res.json({ results: results })
  //       }
  //     })
  //   }
  // } else if (req.query.City && !req.query.State) {
  //   if (req.query.page && !isNaN(req.query.page)) {
  //     var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString()
  //     var query = `
  //               SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
  //               FROM Organization O JOIN Pet P on P.organization_id = O.id
  //               WHERE O.city LIKE '%${City}%'
  //               GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
  //               ORDER BY O.name
  //               LIMIT ${pagesize} OFFSET ${offset};
  //           `
  //     connection.query(query, function (error, results, fields) {
  //       if (error) {
  //         console.log(error)
  //         res.json({ error: error })
  //       } else if (results) {
  //         res.json({ results: results })
  //       }
  //     })
  //   } else {
  //     var query = `
  //               SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
  //               FROM Organization O JOIN Pet P on P.organization_id = O.id
  //               WHERE O.city LIKE '%${City}%'
  //               GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
  //               ORDER BY O.name;
  //           `
  //     connection.query(query, function (error, results, fields) {
  //       if (error) {
  //         console.log(error)
  //         res.json({ error: error })
  //       } else if (results) {
  //         res.json({ results: results })
  //       }
  //     })
  //   }
  // } else if (!req.query.City && req.query.State) {
  //   if (req.query.page && !isNaN(req.query.page)) {
  //     var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString()
  //     var query = `
  //               SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
  //               FROM Organization O JOIN Pet P on P.organization_id = O.id
  //               WHERE O.state LIKE '%${State}%'
  //               GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
  //               ORDER BY O.name
  //               LIMIT ${pagesize} OFFSET ${offset};
  //           `
  //     connection.query(query, function (error, results, fields) {
  //       if (error) {
  //         console.log(error)
  //         res.json({ error: error })
  //       } else if (results) {
  //         res.json({ results: results })
  //       }
  //     })
  //   } else {
  //     var query = `
  //               SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
  //               FROM Organization O JOIN Pet P on P.organization_id = O.id
  //               WHERE O.state LIKE '%${State}%'
  //               GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
  //               ORDER BY O.name;
  //           `
  //     connection.query(query, function (error, results, fields) {
  //       if (error) {
  //         console.log(error)
  //         res.json({ error: error })
  //       } else if (results) {
  //         res.json({ results: results })
  //       }
  //     })
  //   }
  // } else {
  //   if (req.query.page && !isNaN(req.query.page)) {
  //     var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString()
  //     var query = `
  //               SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
  //               FROM Organization O JOIN Pet P on P.organization_id = O.id
  //               GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
  //               ORDER BY O.name
  //               LIMIT ${pagesize} OFFSET ${offset};
  //           `
  //     connection.query(query, function (error, results, fields) {
  //       if (error) {
  //         console.log(error)
  //         res.json({ error: error })
  //       } else if (results) {
  //         res.json({ results: results })
  //       }
  //     })
  //   } else {
  //     var query = `
  //               SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
  //               FROM Organization O JOIN Pet P on P.organization_id = O.id
  //               GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
  //               ORDER BY O.name;
  //           `
  //     connection.query(query, function (error, results, fields) {
  //       if (error) {
  //         console.log(error)
  //         res.json({ error: error })
  //       } else if (results) {
  //         res.json({ results: results })
  //       }
  //     })
  //   }
  // }
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

  connection.query(
    `SELECT DISTINCT breed_name, ${feature} AS feature_rating
                            FROM Breeds_Rating BR LEFT JOIN Pet P ON BR.breed_name = P.breed
                            WHERE P.type = '${req.params.type}'
                            ORDER BY ${feature} DESC 
                            LIMIT 10`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
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
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

// ********************************************
//             RECOMMENDING SYSTEM ROUTES
// ********************************************

//Query b - recommend pets with certain breed featuers to the user
async function recommend(req, res) {
  const input_feature = req.query.input_feature
    ? req.query.input_feature
    : "general_health";
  const type = req.query.type ? req.query.type : "cat";

  if (req.query.page && !isNaN(req.query.page)) {
    //pagination
    const pagesize = req.query.pagesize ? req.query.pagesize : 10;
    var start = (req.query.page - 1) * pagesize;
    var rowNum = pagesize;

    var q = `WITH Temp AS (
            SELECT DISTINCT ${input_feature} FROM Breeds_Rating ORDER BY ${input_feature} DESC LIMIT 2), 
            Breeds_Name AS (
            SELECT breed_name FROM Breeds_Rating WHERE ${input_feature} IN (SELECT * FROM Temp))
            SELECT P.id, P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
            FROM Pet P
            JOIN Breeds_Name BN on P.breed = BN.breed_name
            JOIN Organization O on P.organization_id = O.id
            WHERE type = '${type}'
            LIMIT ${start}, ${rowNum};`;

    connection.query(q, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  } else {
    var q = `WITH Temp AS (
            SELECT DISTINCT ${input_feature} FROM Breeds_Rating ORDER BY ${input_feature} DESC LIMIT 2), 
            Breeds_Name AS (
            SELECT breed_name FROM Breeds_Rating WHERE ${input_feature} IN (SELECT * FROM Temp))
            SELECT P.id, P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
            FROM Pet P
            JOIN Breeds_Name BN on P.breed = BN.breed_name
            JOIN Organization O on P.organization_id = O.id
            WHERE type = '${type}';`;

    connection.query(q, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

// ********************************************
//             FIND-SIMILAR-PETS ROUTES
// ********************************************

//Query f - find similar pets based on pets already liked by the user
// things to consider:
// 1. if a breed is rare, there might only be one pet that matches the criteria; in contrast, if a user likes domestic shorthair or other generic breeds, they will get lots of similar pets;
async function get_similar(req, res) {
  const username = req.query.username ? req.query.username : "testuser";
  // added type as a WHERE clause constraint for easier filtering of cat v.s. dog
  const type = req.query.type ? req.query.type : "cat";

  if (req.query.page && !isNaN(req.query.page)) {
    //pagination
    const pagesize = req.query.pagesize ? req.query.pagesize : 10;
    var start = (req.query.page - 1) * pagesize;
    var rowNum = pagesize;

    // added P.id <> LP.id to avoid recommending the same pet
    var q = `WITH Liked_pet AS (
            SELECT P.id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
            FROM Pet P
            JOIN Liked_by Lb on P.id = Lb.pet_id
            JOIN Organization O on O.id = P.organization_id
            WHERE username = '${username}'
            )
            SELECT DISTINCT P.id, P.organization_id, P.type, P.breed, P.color, P.age, P.gender, P.name, P.photo, O.city AS location
            FROM Pet P, Organization O, Liked_pet LP
            WHERE P.type = LP.type
            AND P.breed = LP.breed
            AND P.color = LP.color
            AND P.age = LP.age
            AND P.gender = LP.gender
            AND O.city = LP.location
            AND P.type = '${type}'
            AND P.id <> LP.id
            LIMIT ${start}, ${rowNum};`;

    connection.query(q, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  } else {
    var q = `WITH Liked_pet AS (
            SELECT P.id, type, breed, color, age, gender, P.name, P.photo, O.city AS location
            FROM Pet P
            JOIN Liked_by Lb on P.id = Lb.pet_id
            JOIN Organization O on O.id = P.organization_id
            WHERE username = '${username}'
            )
            SELECT DISTINCT P.id, P.organization_id, P.type, P.breed, P.color, P.age, P.gender, P.name, P.photo, O.city AS location
            FROM Pet P, Organization O, Liked_pet LP
            WHERE P.type = LP.type
            AND P.breed = LP.breed
            AND P.color = LP.color
            AND P.age = LP.age
            AND P.gender = LP.gender
            AND O.city = LP.location
            AND P.type = '${type}'
            AND P.id <> LP.id;`;

    connection.query(q, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

// ********************************************
//             USER LOGIN ROUTES
// ********************************************

//Query g - retrieve username based on the login information
//Things to consider:
//1. how to handle password securely?
//2. how to handle the case where a user does not exist?
async function user_login(req, res) {
  const email = req.query.email ? req.query.email : "testemail@gmail.com";
  const password = req.query.password ? req.query.password : "testpassword";

  var q = `SELECT username
    FROM User
    WHERE email = '${email}' AND password = '${password}';`;

  connection.query(q, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else if (results) {
      res.json({ results: results });
    }
  });
}

//Query X? - we may need a post request so that users can create their accounts

module.exports = {
  pet_search,
  rescues,
  search_rescues,
  top10,
  compare,
  recommend,
  get_similar,
  user_login,
};
