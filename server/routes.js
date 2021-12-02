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

module.exports = {
    rescues,
    search_rescues
}