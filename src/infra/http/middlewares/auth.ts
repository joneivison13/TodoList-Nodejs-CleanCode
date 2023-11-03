import { NextFunction, Request, Response } from "express";
import {
  ACCESS_DENIED,
  EXPIRED_TOKEN,
  INVALID_TOKEN,
  USER_NOT_FOUND,
} from "../../../utils/errors";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import UserRepository from "../../../repositories/UserRepository";

export default class AuthMiddleware {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.verify = this.verify.bind(this);
  }
  async verify(req: Request, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;
    const type_token = token?.split(" ")[0].toLowerCase();

    switch (type_token) {
      case "bearer":
        jwt.verify(
          String(token?.split(" ")[1]),
          String(process.env.JWT_KEY),
          async (err, _decoded) => {
            const decoded = _decoded as { id: number; email: string };

            if (err instanceof TokenExpiredError) {
              return res.status(EXPIRED_TOKEN.statusCode).json({
                errorCode: EXPIRED_TOKEN.errorCode,
                message: EXPIRED_TOKEN.message,
                data: EXPIRED_TOKEN.data || null,
              });
            }
            if (err) {
              return res.status(ACCESS_DENIED.statusCode).json({
                errorCode: ACCESS_DENIED.errorCode,
                message: ACCESS_DENIED.message,
                data: ACCESS_DENIED.data || null,
              });
            }
            const user = await this.userRepository.findById(decoded.id);
            if (!user) {
              return res.status(USER_NOT_FOUND.statusCode).json({
                errorCode: USER_NOT_FOUND.errorCode,
                message: USER_NOT_FOUND.message,
                data: USER_NOT_FOUND.data || null,
              });
            }
            req.user = user;
            next();
          }
        );
        break;

      default:
        return res.status(INVALID_TOKEN.statusCode).json({
          errorCode: INVALID_TOKEN.errorCode,
          message: INVALID_TOKEN.message,
          data: INVALID_TOKEN.data || null,
        });
        break;
    }
  }
}
