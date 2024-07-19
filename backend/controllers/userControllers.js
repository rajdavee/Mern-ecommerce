const ErrorHandlers = require("../utils/errorhandlers");
const catchAsyncError =  require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;


// exports.registerUser = catchAsyncError(async (req, res, next) => {
//   const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
//     folder: "home/avatars",
//     width: 150,
//     crop: "scale",
//   });

//   const { name, email, password } = req.body;

//   const user = await User.create({
//     name,
//     email,
//     password,
//     avatar: {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     },
//   });

//   sendToken(user, 201, res);
// });


exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  let myCloud = { public_id: "", secure_url: "" };

  if (req.files && req.files.avatar) {
    try {
      console.log("Avatar received for upload:", req.files.avatar); // Debugging line
      const result = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, {
        folder: "home/avatars",
        width: 150,
        crop: "scale",
      });
      myCloud = result;
      console.log("Upload result:", myCloud); // Debugging line
    } catch (error) {
      console.error("Cloudinary upload error:", error); // Debugging line
      return next(new ErrorHandlers("Image upload failed", 500));
    }
  } else {
    console.log("No avatar received in request."); // Debugging line
  }

  if (!myCloud.public_id || !myCloud.secure_url) {
    return next(new ErrorHandlers("Avatar upload failed, public_id or secure_url missing", 500));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});





//login users
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandlers('Please enter email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandlers('Invalid email or password', 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandlers('Invalid email or password', 401));
    }
    sendToken(user, 200, res);
});

//logout 
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true


    });


    res.status(200).json({
        success: true,
        message : "logged out"

    });
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandlers("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Include /api/v1 in the URL
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}password/reset/${resetToken}`;

  const message = `Your password reset token is this :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandlers(error.message, 500));
  }
});



exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandlers(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandlers("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  });

//get users details 
exports.getUserDetails= catchAsyncError(async (req, res, next) =>
{
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
    });

})
//update user password
exports.updatePassword= catchAsyncError(async (req, res, next) =>
  {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);


    if (!isPasswordMatched) {
      return next(new ErrorHandlers("Old Password is incorrect", 400));
    }


    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandlers("Password does not match", 400));
        }


    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);


   
  
  });



  // exports.updateProfile = catchAsyncError(async (req, res, next) => {
  //   const newUserData = {
  //     name: req.body.name,
  //     email: req.body.email,
  //   };
  
  //   const user = await User.findById(req.user.id);
  
  //   if (req.body.avatar !== "" && req.body.avatar !== undefined) {
  //     const imageId = user.avatar.public_id;
  
  //     await cloudinary.uploader.destroy(imageId);
  
  //     const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
  //       folder: "home/avatars",
  //       width: 150,
  //       crop: "scale",
  //     });
  
  //     newUserData.avatar = {
  //       public_id: myCloud.public_id,
  //       url: myCloud.secure_url,
  //     };
  //   }
  
  //   await User.findByIdAndUpdate(req.user.id, newUserData, {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   });
  
  //   res.status(200).json({
  //     success: true,
  //   });
  // });

  exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    const user = await User.findById(req.user.id);
  
    if (!user) {
      return next(new ErrorHandlers("User not found", 404));
    }
  
    if (req.body.avatar && req.body.avatar !== "") {
      if (user.avatar && user.avatar.public_id) {
        // Delete the old avatar from Cloudinary
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }
  
      // Upload the new avatar to Cloudinary
      const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "home/avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  });
  

  //get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users
    });
    });


//get single user---admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandlers(`user does not exist with id :${req.params.id}`));
    }
    res.status(200).json({
      success: true,
      user
      });
      });


 //update user role   ---ADMIN  

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandlers(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

