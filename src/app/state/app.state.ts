import { TodoItem } from './todo-model';

export interface AppState {
    foo: TodoState;
    apiCallCount: number;
    message: string;
}

export interface TodoState {
    todoItems: ReadonlyArray<TodoItem>;
    todoListTitle: string;
}
