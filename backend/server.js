const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exceptions");
    process.exit(1);
});

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "backend/config/config.env" });
}

// Connect to the database
const connectDatabase = require('./config/database');
connectDatabase();

// Cloudinary configuration
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Import and use routes
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoute');

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
