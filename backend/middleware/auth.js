const ErrorHandlers = require("../utils/errorhandlers");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser=catchAsyncErrors(
    async (req, res, next) => {
     const {token} = req.cookies;
     if(!token){
        return next(new ErrorHandlers("please login to access this resource",401));
     }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user=  await User.findById(decodedData.id);
    next();

            
    }

);
exports.authorizeRoles=(...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
           return next (new ErrorHandlers(`role ${req.user.role} is not allowed to access this resource `,403));
        }
        next();


    };

}