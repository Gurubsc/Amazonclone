const express = require('express');
const router = express.Router();
const { newOrder , getSingleOrder , myOrders ,getAllOrders ,updateStatus} = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../middleware/authenticate');

router.route('/orders').post( newOrder );
router.route('/orders/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/get').get(getAllOrders)
router.route('/update/:id').put(updateStatus)

module.exports = router;