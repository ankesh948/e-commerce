const express = require('express')
const jwt = require('jsonwebtoken'); 
const client = require("../config.js")
const route = express.Router();
const middleware = require("../middleWare.js")
const bcrypt = require('bcrypt');


const secretKey = "mysecretKey";
route.post('/', middleware, async (req, res) => {
   const {Email, Password} = req.body;
  try {
    const UsersCollection = client.db("Ecommerce").collection("Users");
    const user = await UsersCollection.findOne({"Email": Email});

    if (!user) {
     return res.status(401).json({ error: 'Email not found' });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (isPasswordValid) {
      const token = jwt.sign({ Email: user.Email }, secretKey, { expiresIn: '1m' });  
      res.status(200).json({ user, token });
    } else {
      return res.status(401).json({ error: 'Invalid Password' });
    }
  } catch (error) {
    res.json({ error: 'An error occurred' });
  }

});






module.exports = route