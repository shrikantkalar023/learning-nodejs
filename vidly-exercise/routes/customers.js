const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customer");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  res.send(await Customer.find().sort("name"));
});

router.get("/:id", validateObjectId, async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  } else res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const { error, value } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    res.status(201).send(
      await new Customer({
        name: value.name,
        phone: value.phone,
      }).save()
    );
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

router.put("/:id", auth, validateObjectId, async (req, res) => {
  const { error, value } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: value.name,
      phone: value.phone,
      isGold: value.isGold,
    },
    { new: true } // return the updated object
  );

  if (!customer) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  } else res.send(customer);

  // TRY CATCH BLOCK

  // try {
  //   res.send(
  //     await Customer.findByIdAndUpdate(
  //       req.params.id,
  //       {
  //         name: value.name,
  //         phone: value.phone,
  //       },
  //       { new: true } // return the updated object
  //     )
  //   );
  // } catch (ex) {
  //   res.status(500).send(ex.message);
  // }
});

router.delete("/:id", auth, validateObjectId, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  } else res.send(customer);
});

module.exports = router;
