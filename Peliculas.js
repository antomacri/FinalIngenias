const express = require('express');
const router = express.Router();

const peliculas = [
  { id: 1, titulo: 'Pelicula 1', año: 2022 },
  { id: 2, titulo: 'Pelicula 2', año: 2023 },
];

router.get('/peliculas.js', (req, res) => {
  
  res.json(peliculas);
});

module.exports = router;
