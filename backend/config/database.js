const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        // Optional: Exit the process if unable to connect
        process.exit(1);
    });
};

module.exports = connectDatabase;
