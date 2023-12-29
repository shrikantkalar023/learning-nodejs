const Joi = require("joi");
const mongoose = require("mongoose");

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

const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid ID.");
  }
  next();
};

exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.validateObjectId = validateObjectId;
