const { Movie, validate } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const { Genre } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("IAm INSIDE");
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  console.log("Iam in the post");
  const { error } = validate(req.body);
  if (error) {
    console.log("Iam in the error part");
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findById(req.body.genreId);
  console.log(genre);
  if (!genre) return res.status(400).send("Invalid genre");
  let newMovie = await new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  newMovie = await newMovie.save();
  res.send(newMovie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  res.send(movie);
});
module.exports = router;
