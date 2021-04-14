import { createReducer, on } from '@ngrx/store';
import { TodoItem } from './todo-model';
import { clearTodos, getTodosSuccess } from './todos.actions';

export const initialState: ReadonlyArray<TodoItem> = [];

export const todosReducer = createReducer(
    initialState,
    on(getTodosSuccess, (state, { todoItems }) => [].concat(state, todoItems)),
    on(clearTodos, _ => [])
);
