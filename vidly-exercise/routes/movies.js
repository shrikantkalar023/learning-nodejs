const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movie");
const validateObjectId = require("../middleware/validateObjectId");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  res.send(await Movie.find().sort("name"));
});

router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).send("The movie with the given ID was not found.");
  } else res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(value.genreId);
  if (!genre) return res.status(404).send("Invalid Genre.");

  try {
    res.status(201).send(
      await new Movie({
        title: value.title,
        genre: { _id: genre._id, name: genre.name },
        numberInStock: value.numberInStock,
        dailyRentalRate: value.dailyRentalRate,
      }).save()
    );
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

router.put("/:id", auth, validateObjectId, async (req, res) => {
  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(value.genreId);
  if (!genre) return res.status(404).send("Invalid Genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: value.title,
      genre: { _id: genre._id, name: genre.name },
      numberInStock: value.numberInStock,
      dailyRentalRate: value.dailyRentalRate,
    },
    { new: true } // return the updated object
  );

  if (!movie) {
    return res.status(404).send("The movie with the given ID was not found.");
  } else res.send(movie);
});

router.delete("/:id", auth, validateObjectId, async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return res.status(404).send("The movie with the given ID was not found.");
  } else res.send(movie);
});

module.exports = router;
