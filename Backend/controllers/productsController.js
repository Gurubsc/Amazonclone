const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsyncError = require('../middleware/catchAsyncError');

//get all products - api/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(
    Product.find(),
    req.query
  ).search().filter();

  const products = await apiFeatures.query;

  if (products.length === 0) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res.status(200).json({
    success: true,
    count: products.length,
    products
  });
});


//get single product - api/product/:id
exports.getSingleProduct = catchAsyncError(async(req, res , next) => {
  const product = await Product.findById(req.params.id);  
  if(!product){
    return next(new ErrorHandler('Product not found test', 404));
  }
  res.status(201).json({
    success: true,
    product,
  });
});

//create new product -api/products/new
exports.newProduct = async(req, res) => {
  req.body.user = req.user.id;
  const product = new Product(req.body);
  await product.save();
  res.status(201).json({ message: 'Product created successfully' });
}
  
//update product - api/product/:id
 exports.updateProduct = async(req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if(!product){
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
}

//delete product - api/product/:id
  exports.deleteProduct = async(req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
      return res.status(404).json({   
        success: false,
        message: 'Product not found',
      });
    } 
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  }
    
//fillter products - api/products/filter
exports.filterProducts = async (req, res) => {
  const { category } = req.params; // ✅ FIX

  const filter = {};

  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter);

  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No products found for the specified category',
    });
  }

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};