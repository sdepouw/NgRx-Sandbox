import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from './app.state';
import { TodoItem } from './todo-model';

export const todoFeatureName = 'foo';

export const selectTodoFeature = createFeatureSelector(todoFeatureName);

export const selectAllTodoItems = createSelector(
  selectTodoFeature,
  (todoState: TodoState) => todoState.todoItems
);

export const selectFirstTodoItem = createSelector(
  selectAllTodoItems,
  (todoItems: ReadonlyArray<TodoItem>) => todoItems && todoItems.length > 0 ? [todoItems[0]] : []
);

export const selectTodoTitle = createSelector(
  selectTodoFeature,
  (todoState: TodoState) => todoState.todoListTitle
);
