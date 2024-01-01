const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const { generateErrorMessages } = require("../utils/generateErrorMessages");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
  })
);

// express validation
const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(4)
      .max(50)
      .required()
      .messages(generateErrorMessages("title", 4, 50)),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(255)
      .required()
      .messages(generateErrorMessages("numberInStock", 0, 255)),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(255)
      .required()
      .messages(generateErrorMessages("dailyRentalRate", 0, 255)),
  });

  return schema.validate(movie);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;
