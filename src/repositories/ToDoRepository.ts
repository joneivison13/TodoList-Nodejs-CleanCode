import { Prisma, Todo } from "@prisma/client";
import Database from "../infra/db";
import { IUpdateTodo } from "../types/types";
import { promises } from "dns";
import AppError from "../utils/appErrors";

export default class TodoRepository {
  async incrementPositionsFrom(position: number) {
    return await Database.todo.updateMany({
      where: {
        index: {
          gte: +position,
        },
      },
      data: {
        index: {
          increment: 1,
        },
      },
    });
  }

  async decrementPositionsBetween(startPosition: number, endPosition: number) {
    await Database.todo.updateMany({
      where: {
        index: {
          gte: startPosition,
          lte: endPosition,
        },
      },
      data: {
        index: {
          decrement: 1,
        },
      },
    });
  }

  async incrementPositionsBetween(startPosition: number, endPosition: number) {
    await Database.todo.updateMany({
      where: {
        index: {
          gte: startPosition,
          lte: endPosition,
        },
      },
      data: {
        index: {
          increment: 1,
        },
      },
    });
  }

  async updateTodoPosition(id: number, newPosition: number) {
    return Database.todo.update({
      where: {
        id,
      },
      data: {
        index: newPosition,
      },
    });
  }

  async createTodo(
    title: string,
    index: number,
    content: string,
    initial_date: Date | string,
    final_date: Date | string,
    tag_color: string,
    user_id: number
  ) {
    return Database.todo.create({
      data: {
        title,
        index,
        authorId: user_id,
        content,
        final_date,
        initial_date,
        tag_color,
      },
    });
  }
  async updateTodo(
    title: string,
    index: number,
    content: string,
    initial_date: Date | string,
    final_date: Date | string,
    tag_color: string,
    user_id: number,
    todo_id: number
  ): Promise<Todo | AppError> {
    return Database.todo.update({
      data: {
        title,
        index,
        content,
        final_date,
        initial_date,
        tag_color,
      },
      where: {
        id: todo_id,
        authorId: user_id,
      },
    });
  }

  async getTodoById(id: number) {
    return await Database.todo.findUnique({ where: { id } });
  }
  async getTodoByUserId(authorId: number) {
    return await Database.todo.findMany({
      where: { authorId },
      orderBy: { index: "asc" },
    });
  }
}
