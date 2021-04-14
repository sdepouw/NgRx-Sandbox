import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { selectCurrentAPICount } from './state/api-call-count.selectors';
import { TodoItem } from './state/todo-model';
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

  directItems: TodoItem[];

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.actions$.pipe(ofType(getTodosSuccess))
      .subscribe(() => { console.log('Success Message could be displayed with this!'); });
  }

  getTheGoods() {
    this.store.dispatch(getTodos());
  }

  clear() {
    this.store.dispatch(clearTodos());
  }
}
