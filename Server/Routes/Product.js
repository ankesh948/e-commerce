const express = require('express')
const productRoute = express.Router();
const multer = require('multer')
const path = require('path')
const { MongoClient, ObjectId } = require("mongodb");



const client = require("../config.js")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../Client/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

// Inserting data, added by Ankesh
productRoute.post("/", upload.single('thumbnail'), async (req, res) => { 
  const { title, description, price, discountPercentage, stock, brand, category } = req.body;
  const thumbnail = 'http://localhost:5173/uploads/'+req.file.filename; 
  const productData = {
    title, description, price, discountPercentage, stock, brand, category, thumbnail,
  };
  try {
    const productsCollection = client.db("Ecommerce").collection("Products");
    const result = await productsCollection.insertOne(productData);
    res.status(201).json({ message: "Product added successfully", productId: result.insertedId });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Getting Data Added by Ankesh
productRoute.get("/", async (req, res) => {
try {
  const productsCollection = client.db("Ecommerce").collection("Products");
  const products = await productsCollection.find({}).toArray();
  res.status(200).json(products);
} catch (error) {
  console.error("Error fetching products:", error);
  res.status(500).json({ message: "Internal server errorr" });
}
});

// Deleting data, added by Ankesh
productRoute.delete("/:productId", async (req, res) => {
const productId = req.params.productId;
try {
  const productsCollection = client.db("Ecommerce").collection("Products");
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

// Updating data, added by Ankesh
productRoute.put("/:productId", upload.single('thumbnail'), async (req, res) => {
const productId = req.params.productId;
const { title, description, price, discountPercentage, stock, brand, category } = req.body;
const updateData = {
  title, description, price, discountPercentage, stock, brand, category,
};
if (req.file) {
  updateData.thumbnail = 'http://localhost:5173/uploads/'+req.file.filename; 
}
try {
  const productsCollection = client.db("Ecommerce").collection("Products");
  const result = await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $set: updateData }
  );

  if (result.modifiedCount > 0) {
    res.status(200).json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
} catch (error) {
  console.error("Error updating product:", error);
  res.status(500).json({ message: "Internal server error" });
}
});

//Getting Data By Id Added by Ankesh
productRoute.get("/:id", async (req, res) => {
const productId = req.params.id; // Get the product ID from the URL parameter
try {
  const productsCollection = client.db("Ecommerce").collection("Products");
  const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
} catch (error) {
  console.error("Error fetching product:", error);
  res.status(500).json({ message: "Internal server error" });
}
});







module.exports = productRoute