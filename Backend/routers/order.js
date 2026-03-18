const express = require('express');
const router = express.Router();
const { newOrder , getSingleOrder , myOrders} = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../middleware/authenticate');

router.route('/orders').post(isAuthenticatedUser, newOrder);
router.route('/orders/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

module.exports = router;