import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";
import ErrorHandler from "../utilities/errorHandler.js";

export const isAuthenticated = async (req, resp, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      resp.status(400).json({ success: false, message: "Login first" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await UserModel.findById(decoded._id);
    }
    next();
  } catch (error) {
    resp.status(500).json("Authentification required");
  }
};

export const authorizeRoles = (...roles) => {
  return (req, resp, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorHandler(
        `Role ${req.user.role} is not allowed to access this resource`,
        403
      );
    } else {
      next();
    }
  };
};
