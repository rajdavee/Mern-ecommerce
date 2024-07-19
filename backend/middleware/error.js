// const ErrorHandler =  require("../utils/errorhandlers");

// module.exports = (err,req,res,next) =>{
//     err.statusCode = err.statusCode || 500 ;
//     err.message = err.message || "internal server error";

//     //wrong mongodb errors
//     if(err.name == "CastError"){
//         const message =  ` resource not found  ${err.path}`;
//         err = new ErrorHandler(message,400);
//     }

//     if(err.code === 11000){
//         const message = `duplicate field value entered ${Object.keys(err.keyValue)} field`
//         err = new ErrorHandler(message,400);

//     }
//     if(err.name === "JsonWebTokenError"){
//         const message =  `json web token is invalid,try again`;
//         err = new ErrorHandler(message,400);

//     }
//     if(err.name === "TokenExpiredError"){
//         const message =  `json web token is expired,try again`;
//         err = new ErrorHandler(message,400);

//     }

//     res.staus(err.statusCode).json({
//         success : false,
//         message: err.message,
//     });
// }




const ErrorHandler = require("../utils/errorhandlers");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Wrong MongoDB errors
  if (err.name === "CastError") {
    const message = `Resource not found: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value entered: ${Object.keys(err.keyValue)} field`;
    err = new ErrorHandler(message, 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid, try again";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token has expired, try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
