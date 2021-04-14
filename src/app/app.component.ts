import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
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
  showingOff = false;

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.actions$.pipe(ofType(getTodosSuccess))
      .pipe(
        tap(() => { this.showingOff = true; }),
        debounceTime(3000),
        tap(() => { this.showingOff = false; })
      ).subscribe();
  }

  getTheGoods() {
    this.store.dispatch(getTodos());
  }

  clear() {
    this.store.dispatch(clearTodos());
  }
}
