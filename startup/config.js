const config = require("config");
const winston = require("winston");

module.exports = function () {
  if (!config.get("jwt-webtoken")) {
    winston.info('jwt webtoken');
    throw new Error("Fatal Error: jwt webtoken");
  }
};
