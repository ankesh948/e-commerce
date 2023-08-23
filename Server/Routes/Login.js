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
      const token = jwt.sign({ userId: user.Email }, secretKey, { expiresIn: '1h' });
      res.json({user, token });
      console.log(user)
    } else {
      res.json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.json({ error: 'An error occurred' });
  }
});


module.exports = route