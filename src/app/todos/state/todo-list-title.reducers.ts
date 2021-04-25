import { createReducer, on } from '@ngrx/store';
import { clearTodos, getTodosSuccess } from './todos.actions';

const initialState = 'My Todos';

export const todoListTitleReducer = createReducer(
  initialState,
  on(getTodosSuccess, existingTitle => `${existingTitle}-`),
  on(clearTodos, _ => initialState)
);
