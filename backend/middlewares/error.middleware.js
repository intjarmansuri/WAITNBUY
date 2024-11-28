import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    // Handle ApiError
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors, // Optional: send any additional error details
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Only show stack trace in development
    });
  }

  // If error is not an instance of ApiError, send generic internal error
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export { errorHandler };
