const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: Boolean,
});
userSchema.methods.generateAuthenToken = function () {
  const token = jwt.sign(
    { _id: this._id, admin: this.admin },
    config.get("jwt-webtoken")
  );
  return token;
};

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}
const User = mongoose.model("User", userSchema);
exports.User = User;
exports.validate = validate;
