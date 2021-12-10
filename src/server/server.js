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

// to get a list of distinct breeds, parameter for dog/cat
app.get("/get_all_breeds", routes,routes.get_all_breeds);

// to get a list of distinct colors, parameter for dog/cat
app.get("/get_all_colors", routes,routes.get_all_colors);

app.get("/", (req, res) => {
  // res.send("Server status OK", 404);
  res.status(404).send("Server status OK");
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
