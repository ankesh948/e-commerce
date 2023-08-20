import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import mysql from 'mysql';
import path from 'path'; // Import the 'path' module

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());

app.use(cors());

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


// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my-vue-app',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});




// PUT API to update a product by ID
app.put("/api/products/:id", upload.single('thumbnail'), (request, response) => {
  const productId = request.params.id;
  const { title, description, price } = request.body;
  const thumbnail =  request.file.filename;

  if (!title || !description || !price) {
    return response.status(400).json({ error: 'All fields are required.' });
  }
  const sql = 'UPDATE products SET title = ?, description = ?, price = ?, thumbnail = ? WHERE id = ?';
  const values = [title, description, price, thumbnail, productId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating product in the database:', err);
      return response.status(500).json({ error: 'Error updating product in the database.' });
    }

    if (result.affectedRows === 0) {
      return response.status(404).json({ error: 'Product not found.' });
    }
    return response.status(200).json({ message: 'Product updated successfully.' })
  });
});





app.post("/api/products", upload.single('thumbnail'), (request, response) => {
  const { title, description, price } = request.body;
  const thumbnail = request.file.filename; // Use the generated unique filename

  // Validate input data (you can add more validation here)
  if (!title || !description || !price || !thumbnail) {
    return response.status(400).json({ error: 'All fields are required.' });
  }

  // Insert the new product data into the 'products' table
  const sql = 'INSERT INTO products (title, description, price, thumbnail) VALUES (?, ?, ?, ?)';
  const values = [title, description, price, thumbnail];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting product into the database:', err);
      return response.status(500).json({ error: 'Error inserting product into the database.' });
    }
    // Return the ID of the newly created product
    return response.status(201).json({ id: result.insertId, message: 'Product created successfully.' });
  });
});



// GET API to fetch all products
app.get("/api/products", (request, response) => {
  // Retrieve all products from the 'products' table
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching products from the database:', err);
      return response.status(500).json({ error: 'Error fetching products from the database.' });
    }
    // Return the fetched products
    return response.status(200).json(result);
  });
});


// GET API to fetch a product by ID
app.get("/api/products/:id", (request, response) => {
  const productId = request.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';

  db.query(sql, productId, (err, result) => {
    if (err) {
      console.error('Error fetching product from the database:', err);
      return response.status(500).json({ error: 'Error fetching product from the database.' });
    }

    if (result.length === 0) {
      return response.status(404).json({ error: 'Product not found.' });
    }
    return response.status(200).json(result[0]);
  });
});



// DELETE API to delete a product by ID
app.delete("/api/products/:id", (request, response) => {
  const productId = request.params.id;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, productId, (err, result) => {
    if (err) {
      console.error('Error deleting product from the database:', err);
      return response.status(500).json({ error: 'Error deleting product from the database.' });
    }

    if (result.affectedRows === 0) {
      return response.status(404).json({ error: 'Product not found.' });
    }
    return response.status(200).json({ message: 'Product deleted successfully.' });
  });
});







app.listen(port, () => {
  console.log('I am live again');
});