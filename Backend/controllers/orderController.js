const catchAsyncError = require('../middleware/catchAsyncError');
const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorhandler');
// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const { 
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
     // ✅ ADD THIS
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
  });

  res.status(201).json({  
    success: true,
    order
  });
});
// Get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
        success: true,
        order
    });
}); 

// Get logged in user Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });    
    res.status(200).json({
        success: true,
        orders
    });
}   );


//upadate 
exports.updateStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // order id
  const { status } = req.body; // new status

  // 🔍 Find order
  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // 🔄 Update status
  order.orderStatus = status;

  // 📦 If delivered → set delivered time
  if (status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated",
    order,
  });
});
//admin get all orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});
