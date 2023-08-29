const express = require('express')
const categoryRoute = express.Router();
const client = require("../config.js")
const middleware = require("../middleWare.js")


categoryRoute.post('/', middleware, async (req, res) => {
    const { categoryName, categorySlug } = req.body;
    const categoryData = {
      categoryName,
      categorySlug,
    };
    try {
      const CategoriesCollection = client.db("Ecommerce").collection("Categories");
      const result = await CategoriesCollection.insertOne(categoryData);
      res.status(201).json({ message: "Category added successfully", categoryId: result.insertedId });
    } catch (error) {
      console.error("Error adding Category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

categoryRoute.get("/", async (req, res) => {
  try {
    const categoriesCollection = client.db("Ecommerce").collection("Categories");
    const categories = await categoriesCollection.find({}).toArray();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server errorr" });
  }
  });


  categoryRoute.delete("/:productId", async (req, res) => {
    const productId = req.params.productId;
    try {
      const productsCollection = client.db("Ecommerce").collection("Categories");
      const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
    });



module.exports = categoryRoute