import { TodoItem } from './todo-model';

export interface AppState {
    foo: TodoState;
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
