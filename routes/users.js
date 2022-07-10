const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bycrypt = require("bcrypt");

router.post("/users", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registerd");
  const newUser = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bycrypt.genSalt(10);
  newUser.password = await bycrypt.hash(newUser.password, salt);
  await newUser.save();
  res.send(_.pick(newUser, ["name", "email", "password"]));
});

router.post("/logins", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Email:", email);
  console.log("Password: ", password);
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Invalid Password or Email");

  const isValidPassword = await bycrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(400).send("Invalid Password or Email");

  res.send(true);
});

module.exports = router;
