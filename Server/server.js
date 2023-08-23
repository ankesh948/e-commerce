const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const loginRoute = require('./Routes/Login');
const productRoute = require('./Routes/Product');
const categoryRoute = require('./Routes/Category');

require('./config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 

const port = process.env.PORT || 4000;

app.use("/api/login", loginRoute);
app.use("/api/products", productRoute);
app.use("/api/categry", categoryRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

