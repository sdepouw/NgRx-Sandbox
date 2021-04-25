import { createReducer, on } from '@ngrx/store';
import { clearTodos, getTodosSuccess } from './todos.actions';
import { TodoItem } from './todo-model';

const initialState: ReadonlyArray<TodoItem> = [];

export const todosReducer = createReducer(
  initialState,
  on(getTodosSuccess, (state: ReadonlyArray<TodoItem>, { todoItems }) => [].concat(state, todoItems)),
  on(clearTodos, _ => [])
);
