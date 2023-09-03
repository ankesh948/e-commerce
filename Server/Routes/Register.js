const express = require('express')
const registerRoute = express.Router();
const multer = require('multer')
const path = require('path')
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');
const client = require("../config.js")

  registerRoute.post("/", async (req, res) => { 
    const {FullName, Email} = req.body;
    
    const saltRounds = 10;
    const Password = await bcrypt.hash(req.body.Password, saltRounds);
    const RegisterData = {
      FullName, Email, Password
    };

    try {
      const RegisterCollection = client.db("Ecommerce").collection("Users");
      const result = await RegisterCollection.insertOne(RegisterData);
      res.status(201).json({ message: "Registration successful", Id: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = registerRoute