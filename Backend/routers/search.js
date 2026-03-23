const express = require('express');
const { searchProducts } = require('../controllers/searchController');

const router = express.Router();

//search products - api/products/search?keyword=example
router.get('/search', searchProducts);

module.exports = router;