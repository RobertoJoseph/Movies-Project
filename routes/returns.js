const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Rental } = require("../models/rental");
router.post("/", async (req, res, next) => {
  if (!req.body.customerId) return res.status(400).send("Customer not found");
  if (!req.body.movieId) return res.status(400).send("Customer not found");
  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });
  console.log("THe Rental, ", rental);
  if (!rental) return res.status(404).send("Rental Not Found");
  if (rental.dateReturned)
    return res.status(400).send("Rental already processed");
  return res.status(401).send("Un Authorized");
});

module.exports = router;
