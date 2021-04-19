import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { selectCurrentAPICount } from '@state/api-call-count.selectors';
import { displayMessage } from '@state/message.actions';
import { selectMessage } from '@state/message.selectors';
import { isThePizzaReady } from '@state/pizza.selectors';
import { clearTodos, getTodosSuccess } from '@state/todos.actions';
import { selectTodoTitle } from '@state/todos.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title$ = this.store.select(selectTodoTitle);
  numberOfAPICalls$ = this.store.select(selectCurrentAPICount);
  message$ = this.store.select(selectMessage);
  pizzaDone$ = this.store.select(isThePizzaReady);

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
}
