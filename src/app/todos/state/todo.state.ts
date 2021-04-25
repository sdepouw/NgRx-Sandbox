import { TodoItem } from './todo-model';

export interface TodoState {
  todoItems: ReadonlyArray<TodoItem>;
  todoListTitle: string;
}
