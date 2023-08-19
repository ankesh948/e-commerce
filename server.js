import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path'; 

import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json()); // Add this line to parse JSON request bodies


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

// Call connectToMongo before setting up routes
connectToMongo();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Use the original filename of the uploaded image
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
const upload = multer({ storage: storage });


app.post("/api/products", upload.single('thumbnail'), async (req, res) => { 

    const { title, description, price, discountPercentage, stock, brand, category } = req.body;
    const thumbnail = req.file.filename; 

    const productData = {
      title,
      description,
      price,
      discountPercentage,
      stock,
      brand,
      category,
      thumbnail,
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
