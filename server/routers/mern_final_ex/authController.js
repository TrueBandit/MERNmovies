const express = require('express');
const jwt = require('jsonwebtoken');
const UserBL = require('../../models/mern_final_ex/BLs/userBL');
const { privateKey } = require('../../configs/config');

var router = express.Router();

router.post('/login', async function(req, res) {
  //finds the user in DB. return null if not found
  let user = await UserBL.findUserAndAuth(req.body);
  if (user) {
    var tokenData = jwt.sign({ id: user._id },
                             privateKey,
                             { expiresIn: 7200 } // expires in 2 hours
                            );
    res.status(200).send({ token: tokenData, fullname: user.fullname });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;