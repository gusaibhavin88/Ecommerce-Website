import ErrorHandler from "../utilities/errorHandler.js";
import CatchAsyncErros from "../middleware/catchAsyncErrors.js";
import UserModel from "../model/userModel.js";
import { sendToken } from "../utilities/sendToken.js";
import { sendMail } from "../utilities/sendMail.js";
import crypto from "crypto";

export const createUser = CatchAsyncErros(async (req, resp, next) => {
  const { name, email, password } = req.body;

  let user = await UserModel.findOne({ email: email });

  if (user) {
    return next(new ErrorHandler("Username already exists", 401));
  } else {
    user = await UserModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: "hdhdh",
        url: "iui",
      },
    });

    const token = await user.getJWTToken();
    resp.status(201).json({
      success: true,
      data: user,
      token,
      message: "User created successfully",
    });
  }
});

export const loginUser = CatchAsyncErros(async (req, resp, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!email || !password) {
    return next(new ErrorHandler("Please fill email and password", 401));
  }
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  } else {
    const ismatch = await user.comparePassword(password);
    if (!ismatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    } else {
      sendToken(resp, 200, user, "User login successfully");
    }
  }
});

export const logoutUser = CatchAsyncErros(async (req, resp, next) => {
  resp.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  resp.status(200).json({ success: true, message: "Logged out successfully" });
});

export const forgotPassword = CatchAsyncErros(async (req, resp, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // Get resetPassword Token

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetpasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetpasswordUrl}  \n\n IF you have not requested this mail then , Please ignore`;

  try {
    await sendMail(user.email, "Ecommerce Password Recovery", message);
    resp.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully `,
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = CatchAsyncErros(async (req, res, next) => {
  const { token } = req.params;
  console.log(token);

  // Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is invalid or has expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(res, 200, user, "User password has been successfully changed");
});
