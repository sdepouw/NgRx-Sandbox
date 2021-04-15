import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { selectCurrentAPICount } from './state/api-call-count.selectors';
import { clearTodos, getTodos, getTodosSuccess } from './state/todos.actions';
import { selectAllTodoItems, selectTodoTitle } from './state/todos.selectors';
import { selectMessage } from './state/message.selectors';
import { displayMessage } from './state/message.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title$ = this.store.select(selectTodoTitle);
  todoItems$ = this.store.select(selectAllTodoItems);
  numberOfAPICalls$ = this.store.select(selectCurrentAPICount);
  message$ = this.store.select(selectMessage);

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.displayMessageOnAction(getTodosSuccess, 'Successfully Got!');
    this.displayMessageOnAction(clearTodos, 'All Cleaned Up!');
  }

  displayMessageOnAction(action: Action, message: string) {
    this.actions$.pipe(ofType(action.type))
      .subscribe(() => { this.store.dispatch(displayMessage({ message })); });
  }

  getTheGoods() {
    this.store.dispatch(getTodos());
  }

  clear() {
    this.store.dispatch(clearTodos());
  }
}
