import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path'; 

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 

const uri = "mongodb+srv://ankeshthakur948:9KVbTMBea793j69B@cluster0.xdf5yku.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

// Inserting data, added by Ankesh
app.post("/api/products", upload.single('thumbnail'), async (req, res) => { 
    const { title, description, price, discountPercentage, stock, brand, category } = req.body;
    const thumbnail = req.file.filename; 
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
app.get("/api/products", async (req, res) => {
  try {
    const productsCollection = client.db("Ecommerce").collection("Products");
    const products = await productsCollection.find({}).toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Deleting data, added by Ankesh
app.delete("/api/products/:productId", async (req, res) => {
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
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Updating data, added by Ankesh
app.put("/api/products/:productId", upload.single('thumbnail'), async (req, res) => {
  const productId = req.params.productId;
  const { title, description, price, discountPercentage, stock, brand, category } = req.body;
  const updateData = {
    title, description, price, discountPercentage, stock, brand, category,
  };
  if (req.file) {
    updateData.thumbnail = req.file.filename;
  }
  try {
    const productsCollection = client.db("Ecommerce").collection("Products");
    const result = await productsCollection.updateOne(
      { _id: ObjectId(productId) },
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




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
