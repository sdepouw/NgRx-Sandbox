import { TodoItem } from './todo-model';

export interface AppState {
    foo: ReadonlyArray<TodoItem>;
    apiCallCount: number;
    message: string;
}

// export interface TodoState {
//     todoItems: ReadonlyArray<TodoItem>;
// }
