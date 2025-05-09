import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  error.message = error.message || "Internal Server Error";

  if (error instanceof Error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  // Handle other errors
  res.status(500).json({
    success: false,
    message: error.message,
  });
};

export default errorMiddleware;
