const express = require("express");
const { Genre, validateGenre } = require("../models/genre");
const { validateObjectId } = require("../utils/validateObjectId");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await Genre.find().sort("name"));
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  } else res.send(genre);
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

router.put("/:id", validateObjectId, async (req, res) => {
  const { error, value } = validateGenre(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: value,
    },
    { new: true } // return the updated object
  );

  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  } else res.send(genre);
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  } else res.send(genre);
});

module.exports = router;
