const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    let token;

    // 1. Check Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // 2. Fallback: check cookies
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    // 3. If no token
    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorHandler('Invalid token. Please login again.', 401));
    }
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