const express = require('express')
const categoryRoute = express.Router();
const client = require("../config.js")
const middleware = require("../middleWare.js")
const { ObjectId } = require("mongodb");

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

  categoryRoute.delete("/:id", async (req, res) => {
    const Id = req.params.id;
    try {
      const CategoriesCollection = client.db("Ecommerce").collection("Categories");
      const result = await CategoriesCollection.deleteOne({ _id: new ObjectId(Id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
    });



module.exports = categoryRoute