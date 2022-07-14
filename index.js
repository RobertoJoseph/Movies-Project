require("express-async-errors");
const winston = require("winston");
const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const genresRouter = require("./routes/genres");
const customersRouter = require("./routes/customers");
const moviesRouter = require("./routes/movies");
const rentalRouter = require("./routes/rental");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const error = require("./middleware/error");
const mongoose = require("mongoose");
winston.add(new winston.transports.File({ filename: "logfile.log" }));
if (!config.get("jwt-webtoken")) {
  console.error("FATAL error: jwt-webtoken is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://127.0.0.1/V")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("COuld not connect to MongoDB..." + err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");

// if(app.get('env')==='development'){
//     app.use(morgan('tiny'));
//     debug("App is starting up");
// }

app.use("/api/genres", genresRouter);
app.use("/api/customers", customersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/users", usersRouter);
app.use("/api/logins", authRouter);
app.use(error);

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
