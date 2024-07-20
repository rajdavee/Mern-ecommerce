const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');
const path = require('path');

// Load environment variables from config file if not in production
if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log("Loading environment variables from backend/config/config.env");
    dotenv.config({ path: "backend/config/config.env" });
}

// Ensure required environment variables are present
if (!process.env.PORT || !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Missing required environment variables");
    process.exit(1);
}

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Import routes
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoute');

// Use routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

// Serve static files from the React app
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
