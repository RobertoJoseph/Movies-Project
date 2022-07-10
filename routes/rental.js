const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const Fawn = require("fawn");
Fawn.init("mongodb://127.0.0.1/V");

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie id");
  if ((await movie).numberInStock == 0) {
    return res.status(400).send("Movie is not in the stock");
  }
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: {
            numberInStock: -1,
          },
        }
      )
      .run();
  } catch (error) {
    res.status(500).send("Something failed");
  }

  res.send(rental);
});

module.exports = router;
