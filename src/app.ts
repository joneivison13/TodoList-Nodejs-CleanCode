import express, { NextFunction, Request, Response } from "express";
import setupRoutes from "./infra/http/routes";
import loggerHandler from "./infra/http/loggerHandler";
import AppError, { errorHandler } from "./utils/appErrors";
import logger from "./infra/logger/logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger";
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument()));
setupRoutes(app);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    logger.error(err.toString());
    return res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message,
      data: err.data || null,
    });
  }

  logger.error(err);

  return res.status(500).json({
    errorCode: "ERR500",
    message: "Internal Server Error",
  });
});

export default app;
