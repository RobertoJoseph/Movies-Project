const mongoose = require("mongoose");
const Joi = require("joi");
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
});

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
