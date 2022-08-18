import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { message, statusCode } = err;
  if (err.isJoi) {
    return res.status(400).json({
      message: err.details[0].message,
    });
  }
  if (message && statusCode) {
    res.status(statusCode).json({ message });
  }
};

export default errorMiddleware;
