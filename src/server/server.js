const express = require("express");
// const mysql = require("mysql");

const cors = require("cors");
const routes = require("./routes");
const config = require("./config.json");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// Route a - register as GET
app.get("/petsearch", routes.pet_search);

// Route b - register as GET
app.get("/recommend", routes.recommend);

// Route c - register as GET
app.get("/rescues", routes.rescues);

// Route d - register as GET
app.get("/search/rescues", routes.search_rescues);

// Route d - register as GET
app.get("/top10", routes.top10);

// Route e - register as GET
app.get("/compare/:username", routes.compare);

// Route f - register as GET
app.get("/get_similar", routes.get_similar);

// Route g - register as GET
app.get("/user_login", routes.user_login);

app.get("/", (req, res) => {
  res.send("Server status OK", 404);
});

app.get("*", (req, res) => {
  res.send("404 Server Error", 404);
});

app.listen(config.server_port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
