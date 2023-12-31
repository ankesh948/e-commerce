const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const loginRoute = require('./Routes/Login');
const productRoute = require('./Routes/Product');
const categoryRoute = require('./Routes/Category');
const registerRoute = require('./Routes/Register');
const protectedRoute = require('./Routes/Protection');
const cartRoute = require('./Routes/Cart');

require('./config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 

const port = process.env.PORT || 4000;

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/protected", protectedRoute);
app.use("/api/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

