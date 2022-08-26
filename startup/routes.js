const genresRouter = require("../routes/genres");
const customersRouter = require("../routes/customers");
const moviesRouter = require("../routes/movies");
const rentalRouter = require("../routes/rental");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const error = require("../middleware/error"); //Asyncing middleWare is the job
module.exports = function (app) {
  app.use("/api/genres", genresRouter);
  app.use("/api/customers", customersRouter);
  app.use("/api/movies", moviesRouter);
  app.use("/api/rentals", rentalRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/logins", authRouter);
  app.use(error);
};

