import { TodoState } from '@state-todos/todo.state';
import { todoFeatureName } from '@state-todos/todos.selectors';

export interface AppState {
  [todoFeatureName]: TodoState; // TODO: Does this need to be declared here?
  pizza: PizzaState;
  apiCallCount: number;
  message: string;
}

export interface PizzaState {
  isCooked: boolean;
  description: string;
}
