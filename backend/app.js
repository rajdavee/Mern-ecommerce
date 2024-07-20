const app = require("./app");
const cloudinary = require('cloudinary').v2;
const connectDatabase = require("./config/database");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to uncaught exceptions");
    process.exit(1);
});

// Connect to the database
connectDatabase();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
