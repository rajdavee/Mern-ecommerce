// const app = require("./app");
// const cloudinary = require('cloudinary').v2;
// const connectDatabase = require("./config/database");

// // Handling uncaught exceptions
// process.on("uncaughtException", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log("Shutting down the server due to uncaught exceptions");
//     process.exit(1);
// });

// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require('dotenv').config({ path: "backend/config/config.env" });
// }

// // Connect to the database
// connectDatabase();

// // Cloudinary configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const server = app.listen(process.env.PORT, () => {
//     console.log(`Server is working on http://localhost:${process.env.PORT}`);
// });

// // Unhandled promise rejection
// process.on("unhandledRejection", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log("Shutting down the server due to unhandled promise rejection");
//     server.close(() => {
//         process.exit(1);
//     });
// });
const app = require("./app");
const cloudinary = require('cloudinary').v2;
const connectDatabase = require("./config/database");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exceptions");
    process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" });
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
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
