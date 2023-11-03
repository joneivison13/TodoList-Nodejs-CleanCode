import { NextFunction, Request, Response } from "express";
import logger from "../logger/logger";

const errorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Erro: ${err.message}`);
  res.status(500).json({ error: "Erro interno do servidor" });
};

export default errorHandler;
