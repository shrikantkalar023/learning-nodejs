const express = require("express");
const router = express.Router();
const { Rental, validateRental } = require("../models/rental");
const { validateObjectId } = require("../utils/validateObjectId");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");

router.get("/", async (req, res) => {
  res.send(await Rental.find().sort("-dateOut"));
});

router.get("/:id", validateObjectId, async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    return res.status(404).send("The rental with the given ID was not found.");
  } else res.send(rental);
});

router.post("/", async (req, res) => {
  const { error, value } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(value.genreId);
  if (!customer) return res.status(404).send("Invalid Customer.");

  const movie = await Movie.findById(value.genreId);
  if (!movie) return res.status(404).send("Invalid Movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  try {
    res.status(201).send(
      await new Rental({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
      }).save()
    );

    movie.numberInStock--;
    movie.save();
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;

// get, get by id, post (create), put (update),update when rental return
