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
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
