import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { message, statusCode } = err;
  if (message && statusCode) {
    res.status(statusCode).json({ message });
  }
};

export default errorMiddleware;
