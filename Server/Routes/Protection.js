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
    res.status(401).json({ message: 'Invalid token.' });
  }
}

protectedRoute.get('/', authenticate, (req, res) => {
    res.status(200).json({ message: 'This is a protected route.' });
});

module.exports = protectedRoute
