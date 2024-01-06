const express = require("express");
const router = express.Router();
const { Rental, validateRental } = require("../models/rental");
const validateObjectId = require("../middleware/validateObjectId");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  res.send(await Rental.find().sort("-dateOut"));
});

router.get("/:id", validateObjectId, async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    return res.status(404).send("The rental with the given ID was not found.");
  } else res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const { error, value } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(value.customerId);
  if (!customer) return res.status(404).send("Invalid Customer.");

  const movie = await Movie.findById(value.movieId);
  if (!movie) return res.status(404).send("Invalid Movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  const session = await Rental.startSession();
  if (!session)
    return res
      .status(500)
      .send("Internal Server Error: Unable to start a database session.");

  session.startTransaction();

  try {
    const rental = new Rental({
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
    });

    await rental.save({ session });

    // throw new Error("Something failed.");

    movie.numberInStock--;
    await movie.save({ session });

    await session.commitTransaction();

    res.status(201).send(rental);
  } catch (ex) {
    await session.abortTransaction();
    res.status(500).send(ex.message);
  } finally {
    session.endSession();
  }
});

module.exports = router;
