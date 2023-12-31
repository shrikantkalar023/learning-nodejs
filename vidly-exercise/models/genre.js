const Joi = require("joi");
const mongoose = require("mongoose");
const { generateErrorMessages } = require("../utils/generateErrorMessages");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

// express validation
const validateGenre = (genre) => {
  const schema = Joi.string()
    .min(4)
    .messages(generateErrorMessages("name", 4, 50));

  return schema.validate(genre);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validateGenre = validateGenre;
