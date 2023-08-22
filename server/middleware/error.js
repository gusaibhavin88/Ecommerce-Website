import ErrorHandler from "../utilities/errorHandler.js";
import ErrorHander from "../utilities/errorHandler.js";

const ErrorMiddleware = (err, req, resp, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongoDb Id Error in URl
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHander(message, 400);
  }

  //  Wrong JWT error

  if (err.name === "jsonWebTokenError") {
    const message = `Json web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }
  //  Wrong JWT Expire Error

  if (err.name === "TokenExpiredError") {
    const message = `Json web Token is expired  , try again`;
    err = new ErrorHandler(message, 400);
  }
  resp
    .status(err.statusCode)
    .json({ success: false, message: err.message, stack: err.stack });
};

export default ErrorMiddleware;
