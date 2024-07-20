<<<<<<< HEAD
// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
// const dotenv = require('dotenv');
// const errorMiddleware = require('./middleware/error');
// const path = require('path');

// if (process.env.NODE_ENV !== "PRODUCTION") {
//     dotenv.config({ path: "backend/config/config.env" });
// }

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cookieParser());
// app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// // Import routes
// const productRoutes = require('./routes/productRoute');
// const userRoutes = require('./routes/userRoute');
// const orderRoutes = require('./routes/orderRoute');
// const paymentRoutes = require('./routes/paymentRoute');

// app.use('/api/v1', productRoutes);
// app.use('/api/v1', userRoutes);
// app.use('/api/v1', orderRoutes);
// app.use('/api/v1', paymentRoutes);

// const buildPath = path.join(__dirname, "../frontend/build");
// app.use(express.static(buildPath));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(buildPath, "index.html"));
// });

// // Error handling middleware
// app.use(errorMiddleware);

// module.exports = app;

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
=======
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
>>>>>>> origin/master
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

<<<<<<< HEAD
// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
=======
// Static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoute');
>>>>>>> origin/master

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

<<<<<<< HEAD
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
=======
// Serve static files like favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Default route
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
>>>>>>> origin/master
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
