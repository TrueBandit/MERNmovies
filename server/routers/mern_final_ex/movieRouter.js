const express = require('express');
const movieBL = require('../../models/mern_final_ex/BLs/movieBL');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../../configs/config');

const router = express.Router();

// middleware to check if the incoming request has a valid JWT token
const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, privateKey, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

router.get('/', checkToken, async (req, res) => {
  const result = await movieBL.getAllMovies();
  res.json(result);
});

router.get('/:id', checkToken, async (req, res) => {
  const id = req.params.id;
  const result = await movieBL.getMovieById(id);
  res.json(result);
});

router.post('/', checkToken, async (req, res) => {
  const obj = req.body;
  const result = await movieBL.addMovie(obj);
  res.json(result);
});

router.put('/:id', checkToken, async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  const result = await movieBL.updateMovie(id, obj);
  res.json(result);
});

router.delete('/:id', checkToken, async (req, res) => {
  const id = req.params.id;
  const result = await movieBL.deleteMovie(id);
  res.json(result);
});

module.exports = router;
