import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = process.env.PORT || 4000;
// connectToMongo();
app.use(express.json()); // Add this line to parse JSON request bodies


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

app.post('/api/products', async (req, res) => {
  const productData = req.body; // Assuming your frontend sends the product data as JSON
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
