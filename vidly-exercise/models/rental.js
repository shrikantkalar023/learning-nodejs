const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        isGold: { type: Boolean, default: false },
        name: {
          type: String,
          required: true,
          minlength: 4,
          maxlength: 50,
        },
        phone: {
          type: String,
          required: true,
          minlength: 4,
          maxlength: 15,
        },
        _id: mongoose.Schema.Types.ObjectId,
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 4,
          maxlength: 50,
        },
        dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
        _id: mongoose.Schema.Types.ObjectId,
      }),
      required: true,
    },
    dateOut: { type: Date, required: true, default: Date.now },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 },
  })
);

const validateRental = (rental) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return schema.validate(rental);
};

exports.Rental = Rental;
exports.validateRental = validateRental;
