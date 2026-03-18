const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

exports.isAuthenticatedUser = catchAsyncError( async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {   
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }   
        next();
    };
}   

exports.logoutuser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // instantly expires
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
});