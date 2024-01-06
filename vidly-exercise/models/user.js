const Joi = require("joi");
const mongoose = require("mongoose");
const { generateErrorMessages } = require("../utils/generateErrorMessages");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

// joi validation for post & put requests
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .messages(generateErrorMessages("name", 4, 50)),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
      .messages(generateErrorMessages("email", 4, 50)),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required()
      .messages(generateErrorMessages("password", 8, 1024)),
  });

  return schema.validate(user);
};

exports.User = User;
exports.validateUser = validateUser;
