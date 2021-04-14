import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store, Action } from '@ngrx/store';
import { debounceTime, tap } from 'rxjs/operators';
import { selectCurrentAPICount } from './state/api-call-count.selectors';
import { clearTodos, getTodos, getTodosSuccess } from './state/todos.actions';
import { selectAllTodoItems } from './state/todos.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todoItems$ = this.store.pipe(select(selectAllTodoItems));
  numberOfAPICalls$ = this.store.pipe(select(selectCurrentAPICount));
  message = '';

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.displayMessageOnAction(getTodosSuccess, 'Successfully Got!');
    this.displayMessageOnAction(clearTodos, 'All Cleaned Up!');
  }

  displayMessageOnAction(action: Action, message: string, displayLengthInSeconds = 3) {
    this.actions$.pipe(ofType(action.type))
      .pipe(
        tap(() => { this.message = message; }),
        debounceTime(displayLengthInSeconds * 1000),
        tap(() => { this.message = ''; })
      ).subscribe();
  }

  getTheGoods() {
    this.store.dispatch(getTodos());
  }

  clear() {
    this.store.dispatch(clearTodos());
  }
}
