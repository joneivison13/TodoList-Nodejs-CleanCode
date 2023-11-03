import TodoRepository from "../repositories/ToDoRepository";
import { TODO_NOTFOUND } from "../utils/errors";

export default class TodoService extends TodoRepository {
  constructor(private todoRepository: TodoRepository) {
    super();
    this.todoRepository = todoRepository;
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
    await this.todoRepository.incrementPositionsFrom(index);

    return this.todoRepository.createTodo(
      title,
      index,
      content,
      initial_date,
      final_date,
      tag_color,
      user_id
    );
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
  ) {
    const has_todo = await this.todoRepository.getTodoById(todo_id);
    if (!has_todo) {
      return TODO_NOTFOUND;
    }
    await this.todoRepository.incrementPositionsFrom(index);
    return await this.todoRepository.updateTodo(
      title,
      index,
      content,
      initial_date,
      final_date,
      tag_color,
      user_id,
      todo_id
    );
  }

  async updateTodoPosition(id: number, newPosition: number) {
    const todo = await this.todoRepository.getTodoById(id);
    if (!todo) throw new Error("Todo not found");

    if (newPosition > todo.index) {
      await this.todoRepository.decrementPositionsBetween(
        todo.index + 1,
        newPosition
      );
    } else if (newPosition < todo.index) {
      await this.todoRepository.incrementPositionsBetween(
        newPosition,
        todo.index - 1
      );
    }

    return this.todoRepository.updateTodoPosition(id, newPosition);
  }
}
