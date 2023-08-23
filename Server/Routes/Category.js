const express = require('express')
const categoryRoute = express.Router();

/******************************Categories code******************************/
categoryRoute.post('/', async (req, res) => {
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


module.exports = categoryRoute