const express = require('express');
const { deleteProduct,updateProduct,getSingleProduct,getProducts,newProduct } = require('../controllers/productsController');
const router = express.Router();
const { isAuthenticatedUser ,authorizeRoles , logoutuser } = require('../middleware/authenticate');

// Sample product data  
//get all products
router.route('/products').get( getProducts);

router.route('/products/new').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route('/product/:id')
                  .get(getSingleProduct)
                  .put(updateProduct)
                  .delete(deleteProduct);
module.exports = router;