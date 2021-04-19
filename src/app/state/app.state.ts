import { TodoItem } from './todo-model';
import { todoFeatureName } from './todos.selectors';

export interface AppState {
  [todoFeatureName]: TodoState;
  pizza: PizzaState;
  apiCallCount: number;
  message: string;
}

export interface TodoState {
  todoItems: ReadonlyArray<TodoItem>;
  todoListTitle: string;
}

export interface PizzaState {
  isCooked: boolean;
  description: string;
}
