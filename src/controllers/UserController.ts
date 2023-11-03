import { NextFunction, Request, Response } from "express";
import { createUserSchema, loginSchema } from "../schemas/user";
import UserService from "../services/User";
import {
  INVALID_CREDENTIALS,
  USER_NOT_FOUND,
  VALIDATION_ERROR,
} from "../utils/errors";
import AppError from "../utils/appErrors";
import GetUserUseCase from "../use_cases/User";

class UserController {
  userService: UserService;
  userUseCase: GetUserUseCase;
  constructor(userService: UserService, userUseCase: GetUserUseCase) {
    this.userService = userService;
    this.userUseCase = userUseCase;
    this.login = this.login.bind(this);
    this.createUser = this.createUser.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = loginSchema.validate(req.body);
      if (validation.error) {
        throw VALIDATION_ERROR(validation.error.details);
      }

      const { email, password } = req.body;

      const userData = await this.userService.validateUserCredentials(
        email,
        password
      );

      if (!userData) {
        throw INVALID_CREDENTIALS;
      }
      const user_jwt = await this.userService.createJsonWebToken({
        email: userData.email,
        id: userData.id,
      });

      return res.status(200).json({
        data: {
          userData,
          auth: user_jwt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = createUserSchema.validate(req.body);
      if (validation.error) {
        throw VALIDATION_ERROR(validation.error.details);
      }

      const { email, name, password, confirm_password } = req.body;

      const new_user = await this.userUseCase.createUser(
        email,
        name,
        password,
        confirm_password
      );

      if (new_user instanceof AppError) {
        return next(new_user);
      }

      return res.status(201).json({ data: new_user });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.body;

      const refreshtoken = await this.userService.refreshJsonWebToken(
        refresh_token
      );

      if (refreshtoken instanceof AppError) {
        return next(refreshtoken);
      }
      return res.json(refreshtoken);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
