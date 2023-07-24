import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection pool instead of a single connection
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my-vue-app',
});

// Test the connection to MySQL
connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  conn.release();
  console.log('Connected to MySQL database');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'thumbnails'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post('/api/products', upload.single('thumbnail'), (req, res) => {
  const { title, description, price } = req.body;
  const thumbnail = req.file;
  const sql = 'INSERT INTO products (title, description, price, thumbnail) VALUES (?, ?, ?, ?)';
  connection.query(sql, [title, description, price, thumbnail], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Error adding product', details: err.message });
    } else {
      console.log('Product added:', result.insertId);
      res.status(200).send('Product added successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
