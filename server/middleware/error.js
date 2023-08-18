import ErrorHander from "../utilities/errorHandler.js";

const ErrorMiddleware = (err, req, resp, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongoDb Id Error in URl
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHander(message, 400);
  }

  resp.status(err.statusCode).json({ success: false, message: err.message });
};

export default ErrorMiddleware;
