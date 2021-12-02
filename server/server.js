const express = require('express');
const mysql      = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

// Route 1 - register as GET 
app.get('/rescues', routes.rescues)

// Route 2 - register as GET 
app.get('/search/rescues', routes.search_rescues)

// Route d - register as GET 
app.get('/top10/:type', routes.top10)

// Route e - register as GET 
app.get('/compare/:username', routes.compare)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
