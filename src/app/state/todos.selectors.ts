import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { TodoItem } from './todo-model';

export const selectAllTodoItems = createSelector(
    (state: AppState) => state.todoItems,
    (todoItems: Array<TodoItem>) => todoItems
);

export const selectFirstTodoItem = createSelector(
    (state: AppState) => state.todoItems,
    (todoItems: Array<TodoItem>) => todoItems && todoItems.length > 0 ? [todoItems[0]] : []
);
