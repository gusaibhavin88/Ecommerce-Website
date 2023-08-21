import ErrorHandler from "../utilities/errorHandler.js";
import CatchAsyncErros from "../middleware/catchAsyncErrors.js";
import UserModel from "../model/userModel.js";
import { sendToken } from "../utilities/sendToken.js";

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
