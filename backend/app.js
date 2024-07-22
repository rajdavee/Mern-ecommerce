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
=======
>>>>>>> 59510e65afaf6c93cc8d8673405a8d310baca812
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');
const path = require('path');

if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "backend/config/config.env" });
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Import routes
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoute');

app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

<<<<<<< HEAD
// Serve frontend
=======
>>>>>>> 59510e65afaf6c93cc8d8673405a8d310baca812
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
