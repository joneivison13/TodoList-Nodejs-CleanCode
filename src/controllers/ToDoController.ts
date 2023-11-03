import { NextFunction, Request, Response } from "express";
import UserService from "../services/User";
import GetUserUseCase from "../use_cases/User";
import { todoSchema, todoUpdateSchema } from "../schemas/todo";
import { USER_NOT_FOUND, VALIDATION_ERROR } from "../utils/errors";
import TodoService from "../services/Todo";
// import { PrivateRequest } from "../types/custom";

class ToDoController {
  userService: UserService;
  userUseCase: GetUserUseCase;
  todoService: TodoService;
  constructor(
    userService: UserService,
    userUseCase: GetUserUseCase,
    todoService: TodoService
  ) {
    this.userService = userService;
    this.userUseCase = userUseCase;
    this.todoService = todoService;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.find = this.find.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = todoSchema.validate(req.body);
      if (validation.error) {
        throw VALIDATION_ERROR(validation.error.details);
      }
      const { title, content, index, initial_date, final_date, tag_color } =
        req.body;
      if (req.user) {
        const new_todo = await this.todoService.createTodo(
          title,
          +index,
          content,
          initial_date,
          final_date,
          tag_color,
          req.user.id
        );
        return res.status(201).json({ data: new_todo });
      } else {
        return next(USER_NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { todo_id } = req.params;
      const validation = todoUpdateSchema.validate(req.body);
      if (validation.error) {
        console.log(validation.error);
        throw VALIDATION_ERROR(validation.error.details);
      }
      const { title, content, index, initial_date, final_date, tag_color } =
        req.body;

      if (req.user) {
        const todo_updated = await this.todoService.updateTodo(
          title,
          +index,
          content,
          initial_date,
          final_date,
          tag_color,
          req.user.id,
          Number(todo_id)
        );
        return res.status(200).json({ data: todo_updated });
      } else {
        return next(USER_NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    console.log({ uuu: req.user });
    try {
      if (req.user) {
        const user_todos = await this.todoService.getTodoByUserId(req.user.id);

        return res.json({ data: user_todos });
      } else {
        throw USER_NOT_FOUND;
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ToDoController;
