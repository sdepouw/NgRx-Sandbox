import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosService } from '@todos/services/todos.service';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getTodos, getTodosSuccess } from './todos.actions';

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodos),
      mergeMap(() => this.todosService.getTodos()
        .pipe(
          map(todos => getTodosSuccess({ todoItems: todos })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todosService: TodosService
  ) { }
}
