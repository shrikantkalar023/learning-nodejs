const Joi = require("joi");
const mongoose = require("mongoose");
const { generateErrorMessages } = require("../utils/generateErrorMessages");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
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
  })
);

// express validation
const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(50)
      .messages(generateErrorMessages("name", 4, 50)),
    phone: Joi.string()
      .min(4)
      .max(50)
      .messages(generateErrorMessages("phone", 4, 50)),
    // isGold: Joi.boolean(),
  });

  return schema.validate(customer);
};

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
