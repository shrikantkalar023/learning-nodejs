const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");

router.post("/", async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: value.email });
  if (user) return res.status(400).send("User already registered.");

  try {
    res.status(201).send(
      await new User({
        name: value.name,
        email: value.email,
        password: value.password,
      }).save()
    );
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;
