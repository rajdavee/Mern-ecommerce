const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Optional: Exit the process if unable to connect
    });
};

module.exports = connectDatabase;
