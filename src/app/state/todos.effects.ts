import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { TodosService } from '../services/todos.service';
import { incrementAPICallCount } from './api-call-count.actions';
import { getTodos, getTodosSuccess } from './todos.actions';

@Injectable()
export class TodosEffects {
    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(getTodos.type),
        mergeMap(() => this.todosService.getTodos()
            .pipe(
                mergeMap(todos => [
                    ({ type: getTodosSuccess.type, todoItems: todos }),
                    ({ type: incrementAPICallCount.type })
                ]),
                catchError(() => EMPTY)
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private todosService: TodosService
    ) { }
}
