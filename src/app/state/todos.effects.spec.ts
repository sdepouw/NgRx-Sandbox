import { TestBed } from '@angular/core/testing';
import { TodosService } from '@app/services/todos.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { expectObservableToReturn } from '@test-helpers';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { TodoItem } from './todo-model';
import { getTodos, getTodosSuccess } from './todos.actions';
import { TodosEffects } from './todos.effects';

describe('Todos Effects', () => {
  let actions$ = new Observable<Action>();
  let effects: TodosEffects;
  let todosServiceSpy: jasmine.SpyObj<TodosService>;

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

  describe('Conventional Tests', () => {
    it('should return successful todo get action with service results', () => {
      actions$ = of(getTodos());
      const expectedTodos: TodoItem[] = [{} as TodoItem];
      todosServiceSpy.getTodos.and.returnValue(of(expectedTodos));
      const expectedAction = getTodosSuccess({ todoItems: expectedTodos });

      effects.loadTodos$.subscribe(result => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should return EMPTY observable when error occurs', () => {
      actions$ = of(getTodos());
      todosServiceSpy.getTodos.and.returnValue(throwError(''));

      expectObservableToReturn(effects.loadTodos$);
    });
  });

  describe('Marbles Tests', () => {
    it('should return successful todo get action with service results', () => {
      const expectedTodos: TodoItem[] = [{} as TodoItem];
      const expectedAction = getTodosSuccess({ todoItems: expectedTodos });

      /* Assuming the flow of time is:
         --a     (hot, starts immediately)
           ----b (cold, waits for 'a' then kicks off on the same frame (hot would not wait, and also start on frame 0!))
         ------c (the sum total of the above time; 'b' resolving is when 'c' triggers)
      */
      actions$ = hot('       --a', { a: getTodos });
      const todos$ = cold('    ----b', { b: expectedTodos });
      const expected$ = hot('------c', { c: expectedAction });
      todosServiceSpy.getTodos.and.returnValue(todos$);

      expect(effects.loadTodos$).toBeObservable(expected$);
    });

    it('should return EMPTY observable when error occurs', () => {
      actions$ = hot('---d', { d: getTodos });
      todosServiceSpy.getTodos.and.returnValue(throwError(''));

      // EMPTY in this context never completes, so it adds nothing to the stream.
      expect(effects.loadTodos$).toBeObservable(cold('---'));
    });
  });
});
