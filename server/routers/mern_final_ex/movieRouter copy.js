const express = require('express');
const movieBL = require('../../models/mern_final_ex/BLs/movieBL');

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await movieBL.getAllMovies();
    res.json(result);
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await movieBL.getMovieById(id);
    res.json(result);
  });
  
  router.post('/', async (req, res) => {
    const obj = req.body;
    const result = await movieBL.addMovie(obj);
    res.json(result);
  });
  
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    const result = await movieBL.updateMovie(id, obj);
    res.json(result);
  });
  
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await movieBL.deleteMovie(id);
    res.json(result);
  });

module.exports = router;