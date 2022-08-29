const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/mongo")();
require("./startup/config")();
const server = app.listen(3000, () => {
  console.log("Listening to port 3000");
});

module.exports = server;
