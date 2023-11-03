import express from "express";
import type { Express } from "express";
import UserController from "../../controllers/UserController";
import logger from "../logger/logger";
import UserRepository from "../../repositories/UserRepository";
import UserService from "../../services/User";
import GetUserUseCase from "../../use_cases/User";
import ToDoController from "../../controllers/ToDoController";
import AuthMiddleware from "./middlewares/auth";
import TodoService from "../../services/Todo";
import TodoRepository from "../../repositories/ToDoRepository";

export default (app: Express) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userUseCase = new GetUserUseCase(userRepository, userService);
  const userController = new UserController(userService, userUseCase);

  const todoRepository = new TodoRepository();
  const todoService = new TodoService(todoRepository);
  const todoController = new ToDoController(
    userService,
    userUseCase,
    todoService
  );

  const authMiddleware = new AuthMiddleware(userRepository);

  const routerv1 = express.Router();

  routerv1.get("/", (_, res) => {
    return res.json({ ok: true });
  });
  routerv1.post("/login", userController.login);
  routerv1.post("/signin", userController.createUser);
  routerv1.post("/refresh_token", userController.refreshToken);

  routerv1.post("/todo/create", authMiddleware.verify, todoController.create);
  routerv1.put("/todo/:todo_id", authMiddleware.verify, todoController.update);
  routerv1.get("/todo", authMiddleware.verify, todoController.find);

  app.use("/api/v1.0", routerv1);
};
