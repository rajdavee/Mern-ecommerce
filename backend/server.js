const app = require("./app");
const cloudinary = require('cloudinary').v2;
const connectDatabase = require("./config/database");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to uncaught exceptions");
    process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log("Loading environment variables from backend/config/config.env");
    require('dotenv').config({ path: "backend/config/config.env" });
    console.log("Environment variables loaded:", process.env);
}

// Connect to the database
connectDatabase();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
