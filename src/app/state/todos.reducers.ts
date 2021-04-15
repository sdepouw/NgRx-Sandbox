import { createReducer, on } from '@ngrx/store';
import { clearTodos, getTodosSuccess } from './todos.actions';
import { TodoItem } from './todo-model';

const initialState: ReadonlyArray<TodoItem> = [];

export const todosReducer = createReducer(
    initialState,
    on(getTodosSuccess, (state: ReadonlyArray<TodoItem>, { todoItems }) => [].concat(state, todoItems)),
    on(clearTodos, _ => [])
);

const initialTitleState = 'My Todos';

export const todoListTitleReducer = createReducer(
    initialTitleState,
    on(getTodosSuccess, existingTitle => `${existingTitle}-`),
    on(clearTodos, _ => initialTitleState)
);
