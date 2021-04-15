import { createReducer, on } from '@ngrx/store';
import { clearTodos, getTodosSuccess } from './todos.actions';
import { TodoItem } from './todo-model';

export const initialState: ReadonlyArray<TodoItem> = [];

export const todosReducer = createReducer(
    initialState,
    // on(getTodosSuccess, (state: TodoState, { todoItems }) => ({ ...state, todoItems: [].concat(state.todoItems, todoItems) })),
    on(getTodosSuccess, (state: ReadonlyArray<TodoItem>, { todoItems }) => [].concat(state, todoItems)),
    on(clearTodos, _ => [])
    // on(clearTodos, state => ({ ...state, todoItems: [] }))
);
