const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const productRoutes = require('./routers/products');
const errorMiddleware = require('./middleware/error');
const authRoutes = require('./routers/auth');
const cookieParser = require('cookie-parser');
const orderRoutes = require('./routers/order');
const cors = require('cors');

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.set("query parser", "extended");
app.use(cookieParser());


app.use('/api', productRoutes);
app.use( authRoutes);
app.use('/api', orderRoutes);

//Image upload route
const uploadRoutes = require('./routers/uploadRoutes');
app.use('/api', uploadRoutes);

// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;