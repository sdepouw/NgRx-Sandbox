import { createReducer, on } from '@ngrx/store';
import { TodoItem } from './todo-model';
import { getTodosSuccess } from './todos.actions';

export const initialState: Array<TodoItem> = [];

export const todosReducer = createReducer(
    initialState,
    on(getTodosSuccess, (state, { todoItems }) => [].concat(state, todoItems))
);
