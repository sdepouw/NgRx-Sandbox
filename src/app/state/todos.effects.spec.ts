import { TestBed } from '@angular/core/testing';
import { TodosService } from '@app/services/todos.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TodoItem } from './todo-model';
import { getTodosSuccess, getTodos } from './todos.actions';
import { TodosEffects } from './todos.effects';
import { displayMessage } from './message.actions';

let actions$ = new Observable<Action>();

let effects: TodosEffects;
let todosServiceSpy: jasmine.SpyObj<TodosService>;


describe('Todos Effects', () => {
  beforeEach(() => {
    const todosServiceSpyObject = jasmine.createSpyObj('TodosService', ['getTodos']);

    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        provideMockActions(() => actions$),
        { provide: TodosService, useValue: todosServiceSpyObject }
      ]
    });

    effects = TestBed.inject(TodosEffects);
    todosServiceSpy = TestBed.inject<TodosService>(TodosService) as jasmine.SpyObj<TodosService>;
  });

  it('should return successful todo get action with service results', () => {
    actions$ = of(getTodos()); // when subscribe() called, these actions are processed.
    const expectedTodos: TodoItem[] = [{} as TodoItem];
    todosServiceSpy.getTodos.and.returnValue(of(expectedTodos));
    const expectedAction = getTodosSuccess({ todoItems: expectedTodos });

    effects.loadTodos$.subscribe(result => {
      expect(result).toEqual(expectedAction);
    });
  });
});
