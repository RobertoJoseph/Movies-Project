const Joi = require("joi");
const mongoose = require("mongoose");
const rentalSchema = mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 550,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

function validate(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate(rental);
}
const Rental = mongoose.model("Rental", rentalSchema);
exports.Rental = Rental;
exports.validate = validate;
