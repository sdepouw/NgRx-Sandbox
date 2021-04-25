import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearTodos, getTodos } from '@state-todos/todos.actions';
import { selectAllTodoItems } from '@state-todos/todos.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todoItems$ = this.store.select(selectAllTodoItems);

  constructor(private store: Store) { }

  getTheGoods = (): void => this.store.dispatch(getTodos());
  clear = (): void => this.store.dispatch(clearTodos());
}
