const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require('../utils/jwt');
const ErrorHandler = require("../utils/errorhandler");
const {sendEmail} = require("../utils/email");
const crypto = require('crypto');

// Example usage of catchAsyncError in a controller function
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const {name , email, password , avater } = req.body;
    // Reg for user login
 const user = await User.create({ name, email, password, avater  });
  sendToken(user, 201, res);
}); 

// Example of error handling
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  } 
  // Check if password matches
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});


// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    } 
    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Amazon Password Recovery',  
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined; 
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    }); 
    if (!user) {
        return next(new ErrorHandler('Reset Password Token is invalid or has been expired', 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }
    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
});

//

//get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);  
    res.status(200).json({
        success: true,
        user,
    });
});

//update user data
exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true, 
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        user,
    });
});

// Add product to user
exports.addProductToUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    // prevent duplicate
    if (user.products.includes(req.body.productId)) {
        return res.status(400).json({
            success: false,
            msg: "Product already added"
        });
    }

    user.products.push(req.body.productId);
    await user.save();

    res.status(200).json({
        success: true,
        user
    });
});

//remove product from user
exports.removeProductFromUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    user.products = user.products.filter(productId => productId.toString() !== req.body.productId);
    await user.save();

    res.status(200).json({
        success: true,
        user
    });
});