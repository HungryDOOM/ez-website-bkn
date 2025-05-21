const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva película
router.post('/', async (req, res) => {
  const { title, director, year, genre, rating } = req.body;
  const newMovie = new Movie({ title, director, year, genre, rating });
  try {
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;