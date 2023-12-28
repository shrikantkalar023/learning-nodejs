const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const genres = [
  { id: 1, name: "genre1" },
  { id: 2, name: "genre2" },
  { id: 3, name: "genre3" },
];

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
  })
);

// express validation
const validateGenre = (genre) => {
  const schema = Joi.string().min(4).messages({
    "string.min": `"name" should have a minimum length of 4`,
    "string.empty": `"name" is a required field`,
  });

  return schema.validate(genre);
};

// FIXME: instead of using try/catch blocks, throw errors if genre is not found
router.get("/", async (req, res) => {
  res.send(await Genre.find().sort("name"));
});

router.get("/:id", async (req, res) => {
  try {
    res.send(await Genre.findById(req.params.id));
  } catch (ex) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
});

router.post("/", async (req, res) => {
  const { error, value } = validateGenre(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    res.status(201).send(
      await new Genre({
        name: value,
      }).save()
    );
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error, value } = validateGenre(req.body.name);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    res.send(
      await Genre.findByIdAndUpdate(
        req.params.id,
        {
          name: value,
        },
        { new: true } // return the updated object
      )
    );
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    res.send(await Genre.findByIdAndDelete(req.params.id));
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;
