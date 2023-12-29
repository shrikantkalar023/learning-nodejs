const Joi = require("joi");
const mongoose = require("mongoose");

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

const generateErrorMessages = (fieldName) => ({
  "string.min": `"${fieldName}" should have a minimum length of 4`,
  "string.empty": `"${fieldName}" is a required field`,
});

// express validation
const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).messages(generateErrorMessages("name")),
    phone: Joi.string().min(4).max(50).messages(generateErrorMessages("phone")),
    // isGold: Joi.boolean(),
  });

  return schema.validate(customer);
};

const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid ID.");
  }
  next();
};

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
exports.validateObjectId = validateObjectId;
