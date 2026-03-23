const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },

    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      max: [1000000, 'Price cannot exceed 10 lakhs'],
    },

    category: {
      type: String,
      required: [true, 'Please select product category'],
    },

    image: {
      filename: {
        type: String,
        required: true,
      },
    },

    ratings: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },

    seller: {
      type: String,
      required: [true, 'Please enter product seller name'],
    },

    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      max: [99999, 'Stock cannot exceed 5 digits'],
      default: 0,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        name: {
          type: String,
        
        },
        rating: {
          type: Number,
    
        },
        comment: {
          type: String,
    
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
