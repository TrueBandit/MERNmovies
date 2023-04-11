const express = require('express');
const subscriptionBL = require('../../models/mern_final_ex/BLs/subscriptionBL');
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
    const subscriptions = await subscriptionBL.getAllSubscriptions();
    res.json(subscriptions);
  });

  router.post('/', checkToken, async (req, res) => {
    const obj = req.body;
    const result = await subscriptionBL.addSubscription(obj);
    res.json(result);
  });


module.exports = router;