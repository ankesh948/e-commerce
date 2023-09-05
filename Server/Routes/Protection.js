const express = require('express')
const protectedRoute = express.Router();
const client = require("../config.js")
const jwt = require('jsonwebtoken');


const secretKey = 'mysecretKey';

function authenticate(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
  } catch (ex) {
    next(ex);
  }
}

protectedRoute.get('/', authenticate, (req, res) => {
    console.log(req.user)
});

module.exports = protectedRoute
