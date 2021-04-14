import { TodoItem } from './todo-model';

export interface AppState {
    todoItems: ReadonlyArray<TodoItem>;
}
