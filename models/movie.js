const { required } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number,
});
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });
  return schema.validate(movie);
}
const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
exports.movieSchema = movieSchema;
exports.validate = validateMovie;
