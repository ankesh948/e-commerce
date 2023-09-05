const express = require('express')
const cartRoute = express.Router();
const client = require("../config.js");
const middleware = require('../middleWare.js');

  cartRoute.post("/", middleware, async (req, res) => { 
    try {
      const CartCollection = client.db("Ecommerce").collection("Cart_Products");
      const result = await CartCollection.insertOne(req.body);
      res.status(201).json({ message: "Product Added In Cart", Id: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
});

  cartRoute.get("/:email", async (req, res) => { 
  const userEmail = req.params.email; 
    try {
      const CartCollection = client.db("Ecommerce").collection("Cart_Products");
      const result = await CartCollection.find({ Email: userEmail }).toArray();
      if (!result) {
        return res.status(401).json({ message: "Cart not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });



module.exports = cartRoute