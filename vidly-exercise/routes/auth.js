const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { generateErrorMessages } = require("../utils/generateErrorMessages");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  const { error, value } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: value.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(value.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

const validateAuth = (req) => {
  const schema = Joi.object({
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

  return schema.validate(req);
};

module.exports = router;
