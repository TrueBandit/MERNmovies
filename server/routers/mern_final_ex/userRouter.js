const express = require('express');
const userBL = require('../../models/mern_final_ex/BLs/userBL');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await userBL.getAllUsers();
    res.json(users);
  });

module.exports = router;