const express = require('express');
const {registerUser ,loginUser , resetPassword } = require('../controllers/authController');
const router = express.Router();
const { logoutuser } = require('../middleware/authenticate');
const { forgotPassword , getUserDetails , updateUserDetails , addProductToUser , removeProductFromUser} = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middleware/authenticate');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutuser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/getdetails').get(isAuthenticatedUser , getUserDetails); 
router.route('/updatedetails').put(isAuthenticatedUser , updateUserDetails);
router.route('/addproduct').post(isAuthenticatedUser , addProductToUser);
router.route('/removeid').post(isAuthenticatedUser , removeProductFromUser);

module.exports = router;
