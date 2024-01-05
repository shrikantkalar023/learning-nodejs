const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

router.post("/", async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: value.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(value, ["name", "email", "password"]));
  user.password = await bcrypt.hash(user.password, 10);

  try {
    res.status(201).send(_.pick(await user.save(), ["_id", "name", "email"]));
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;
