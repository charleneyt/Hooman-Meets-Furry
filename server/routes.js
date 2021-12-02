const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// ********************************************
//             RESCUE-SPECIFIC ROUTES
// ********************************************

// Route 1 (handler)
// Returns an array of information about a rescue, specified by organization_id
async function rescues(req, res) {
    const id = req.query.id
    if (req.query.id && !isNaN(req.query.id)) {
        var query = `
            SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
            FROM Organization O JOIN Pet P on P.organization_id = O.id
            WHERE P.organization_id = ${id}
            GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type;
        `;
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
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
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
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
    
    const City = req.query.City
    const State = req.query.State
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    if (req.query.City && req.query.State) {
        if (req.query.page && !isNaN(req.query.page)) {
            var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString()
            var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                WHERE O.city LIKE '%${City}%'
                    AND O.state LIKE '%${State}%'
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name
                LIMIT ${pagesize} OFFSET ${offset};
            `;
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                WHERE O.city LIKE '%${City}%'
                    AND O.state LIKE '%${State}%'
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name;
            `;
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    } else if (req.query.City && !req.query.State) {
        if (req.query.page && !isNaN(req.query.page)) {
            var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString()
            var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                WHERE O.city LIKE '%${City}%'
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name
                LIMIT ${pagesize} OFFSET ${offset};
            `;
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                WHERE O.city LIKE '%${City}%'
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name;
            `;
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    } else if (!req.query.City && req.query.State) {
        if (req.query.page && !isNaN(req.query.page)) {
            var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString()
            var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                WHERE O.state LIKE '%${State}%'
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name
                LIMIT ${pagesize} OFFSET ${offset};
            `;
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                WHERE O.state LIKE '%${State}%'
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name;
            `;
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    } else {
        if (req.query.page && !isNaN(req.query.page)) {
            var offset = ((parseInt(page) - 1) * parseInt(pagesize)).toString()
            var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name
                LIMIT ${pagesize} OFFSET ${offset};
            `;
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            var query = `
                SELECT P.organization_id, O.name, O.address, O.city AS location, O.email, type, COUNT(*) AS num
                FROM Organization O JOIN Pet P on P.organization_id = O.id
                GROUP BY P.organization_id, O.name, O.address, O.city, O.email, type
                ORDER BY O.name;
            `;
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    }
}
// ********************************************
//             TOP 10 Cat/Dog Breeds 
// ********************************************

// Route d (handler)
async function top10(req, res) {
    // default the feature to affectionate_with_family
    const feature = req.query.feature ? req.query.feature : "affectionate_with_family"

    connection.query(`SELECT DISTINCT breed_name, ${feature} AS feature_rating
                            FROM Breeds_Rating BR LEFT JOIN Pet P ON BR.breed_name = P.breed
                            WHERE P.type = '${req.params.type}'
                            ORDER BY ${feature} DESC 
                            LIMIT 10`, function (error, results, fields) {
                                if (error) {
                                    console.log(error)
                                    res.json({ error: error })
                                } else if (results) {
                                    res.json({ results: results })
                                }
    });
}

// ********************************************
//               Pet Comparing
// ********************************************


// Route e (handler)
async function compare(req, res) {
    // not necessary - just used for testing
    const username = req.params.username ? req.params.username : "testuser"

    connection.query(`SELECT LB.pet_id, P.name, type, breed, color, age, gender, P.photo, O.city AS location
                        FROM Pet P
                        JOIN Liked_by LB on P.id = LB.pet_id
                        JOIN Organization O on O.id = P.organization_id
                        WHERE username = '${username}'`, function (error, results, fields) {
                                if (error) {
                                    console.log(error)
                                    res.json({ error: error })
                                } else if (results) {
                                    res.json({ results: results })
                                }
    });
}


module.exports = {
    rescues,
    search_rescues，
    top10,
    compare
}
