const mongoose = require("mongoose");
const Product = require("../models/productModel");
const products = require("../data/data.json");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname,'../config/config.env') });
const connectDatabase = require("../config/database");

connectDatabase();
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");    
    await Product.insertMany(products);
    console.log("All Products are added");
    process.exit();
  }
    catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();