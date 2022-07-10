const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, no valid token");
  try {
    const decodded = jwt.verify(token, config.get("jwt-webtoken"));
    req.user = decodded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
