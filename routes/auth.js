const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const _ = require("lodash");
const bycrypt = require("bcrypt");
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Invalid Password or Email");
  const isValidPassword = await bycrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(400).send("Invalid Password or Email");
  const token = user.generateAuthenToken();
  res.send(token);
});

module.exports = router;
