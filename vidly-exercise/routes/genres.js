const express = require("express");
const Joi = require("joi");

const router = express.Router();

const genres = [
  { id: 1, name: "genre1" },
  { id: 2, name: "genre2" },
  { id: 3, name: "genre3" },
];

const validateGenre = (genre) => {
  const schema = Joi.string().min(4).messages({
    "string.min": `"name" should have a minimum length of 4`,
    "string.empty": `"name" is a required field`,
  });

  return schema.validate(genre);
};

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error, value } = validateGenre(req.body.name);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: value,
  };

  genres.push(genre);
  res.status(201).send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error, value } = validateGenre(req.body.name);

  if (error) return res.status(400).send(error.details[0].message);

  genre.name = value;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

module.exports = router;
