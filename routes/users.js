const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bycrypt = require("bcrypt");
const auth = require("../middleware/auth");
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registerd");
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bycrypt.genSalt(10);
  user.password = await bycrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthenToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(req.body, ["name", "email", "password"]));
});

module.exports = router;
