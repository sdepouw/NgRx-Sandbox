import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoItem } from '@state-todos/todo-model';
import { incrementAPICallCount } from '@state/api-call-count.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private store: Store, private http: HttpClient) { }

  getTodos(): Observable<TodoItem[]> {
    this.store.dispatch(incrementAPICallCount());
    return this.http
      .get<TodoItem[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(map(x => x.slice(0, 5)));
  }
}
