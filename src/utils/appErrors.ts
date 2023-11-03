import { Request, Response, NextFunction } from "express";
import logger from "../infra/logger/logger";
class AppError extends Error {
  errorCode: string;
  statusCode: number;
  data?: object;

  constructor(
    message: string,
    errorCode: string,
    statusCode: number = 400,
    data?: object
  ) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.data = data;
  }

  toString() {
    return `${this.errorCode} - ${this.statusCode}: ${
      this.message
    } \n ${JSON.stringify(this.data || {}, null, 2)}`;
  }
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  const errorCode = err.errorCode || "ERR500";

  res.status(statusCode).json({
    errorCode,
    errorMessage,
  });
};

export default AppError;
