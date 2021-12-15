const express = require("express");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");

const cors = require("cors");
const routes = require("./routes");
const config = require("./config.json");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());

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
app.get("/get_all_breeds", routes.get_all_breeds);

// to get a list of distinct colors, parameter for dog/cat
app.get("/get_all_colors", routes.get_all_colors);

// to get all info (pet and organization related) for a given pet
app.get("/get_all_info/:id", routes.get_all_info);

// to insert a tuple of (username, pet_id) into Liked_by
app.post("/mark_favorite", routes.mark_favorite);

// to get all pets liked by a user
app.get("/get_all_pets_liked_by_user", routes.get_all_pets_liked_by_user);

// to delete a tuple of (username, pet_id) from Liked_by
app.post("/delete_favorite", routes.delete_favorite);

app.get("/", (req, res) => {
  // res.send("Server status OK", 404);
  res.status(404).send("Server status OK");
});

app.get("*", (req, res) => {
  res.status(404).send("404 Server Error");
});

app.listen(config.server_port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
