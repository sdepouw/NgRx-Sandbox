import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodosService } from '../services/todos.service';
import { getTodos, getTodosSuccess } from './todos.actions';

@Injectable()
export class TodosEffects {
    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(getTodos),
        mergeMap(() => this.todosService.getTodos()
            .pipe(
                map(todos => getTodosSuccess({ todoItems: todos })),
                catchError(() => EMPTY)
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private todosService: TodosService
    ) { }
}
