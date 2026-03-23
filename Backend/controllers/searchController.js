const product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//search products - api/products/search?keyword=example
exports.searchProducts = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
            $options: 'i', // case-insensitive
        },
      }
    : {};
      
    const products = await product.find({ ...keyword });

    if (products.length === 0) {
      return next(new ErrorHandler("No products found matching the keyword", 404));
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
});