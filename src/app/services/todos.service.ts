import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from '../state/todo-model';

@Injectable({ providedIn: 'root' })
export class TodosService {
    constructor(private http: HttpClient) { }

    getTodos(): Observable<TodoItem[]> {
        return this.http
            .get<TodoItem[]>('https://jsonplaceholder.typicode.com/todos')
            .pipe(map(x => x.slice(0, 5)));
    }
}
