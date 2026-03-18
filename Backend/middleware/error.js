const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // DEVELOPMENT MODE
    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    // PRODUCTION MODE
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;

        // ❌ Wrong MongoDB ObjectId
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        // ❌ Duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(message, 400);
        }

        // ❌ Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors)
                .map(val => val.message)
                .join(', ');
            error = new ErrorHandler(message, 400);
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
