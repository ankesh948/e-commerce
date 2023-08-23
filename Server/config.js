const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const uri = "mongodb+srv://ankeshthakur948:9kjDCbGrhAxuECCp@cluster0.xdf5yku.mongodb.net/Ecommerce";
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

module.exports = client;