import { createAction, props } from '@ngrx/store';
import { TodoItem } from './todo-model';

export const getTodos = createAction(
    '[TODO] Get TODO Items'
);

export const getTodosSuccess = createAction(
    '[TODO] Get TODO Items Success',
    props<{ todoItems: TodoItem[] }>()
);
