const express = require('express')
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const client = require("../config.js")
const route = express.Router();

const secretKey = "mysecretKey";
route.post('/', async (req, res) => {
  try {
    const UsersCollection = client.db("Ecommerce").collection("Users");
    const user = await UsersCollection.findOne(req.body);
    if (user) {
      const token = jwt.sign({ Email: user.Email }, secretKey, { expiresIn: '20s' });
      res.json({user, token});
    } else {
      res.json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.json({ error: 'An error occurred' });
  }
});


module.exports = route