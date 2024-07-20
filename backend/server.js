const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const connectDatabase = require('./config/database');
const errorMiddleware = require('./middleware/error');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Connect to the database
connectDatabase();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoute');

app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

// Serve static files like favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Default route
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exceptions");
    process.exit(1);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
