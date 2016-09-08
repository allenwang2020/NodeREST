
// Dependencies
var express = require('express');
var router = express.Router();

//route to return all products (GET http://localhost:8080/api/products)
//Product
var Product = require('../models/product');
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');


// Return router
module.exports = router;
