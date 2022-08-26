const winston = require("winston");
require("express-async-errors");
// require("winston-mongodb");
module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: "mongodb://127.0.0.1/V",
  //     level: "info",
  //     options: {
  //       useUnifiedTopology: true,
  //     },
  //   })
  // );
  winston.exceptions.handle(
    new winston.transports.File({ filename: "execp.log" })
  );
};
