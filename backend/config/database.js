const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,  // Adjust this if needed
        useFindAndModify: false,         // Optional: Avoid deprecation warnings
        useCreateIndex: true             // Optional: Avoid deprecation warnings
    })
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
