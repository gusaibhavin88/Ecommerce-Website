const ErrorMiddleware = (err, req, resp, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  resp.status(err.statusCode).json({ message: false, error: err });
};

export default ErrorMiddleware;
