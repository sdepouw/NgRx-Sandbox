import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectTodoFeature = createFeatureSelector('foo');

export const selectAllTodoItems = createSelector(
    selectTodoFeature,
    (todoState: any) => todoState.todoItems
);

// export const selectFirstTodoItem = createSelector(
//     selectAllTodoItems,
//     (todoItems: Array<TodoItem>) => todoItems && todoItems.length > 0 ? [todoItems[0]] : []
// );
