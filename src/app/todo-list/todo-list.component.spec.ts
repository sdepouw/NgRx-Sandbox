import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodosService } from '@app/services/todos.service';
import { Actions, EffectsModule, ofType } from '@ngrx/effects';
import { StoreModule, ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoItem } from '@state/todo-model';
import { clearTodos, getTodos, getTodosSuccess } from '@state/todos.actions';
import { TodosEffects } from '@state/todos.effects';
import { todosReducer } from '@state/todos.reducers';
import { todoFeatureName } from '@state/todos.selectors';
import * as testHelpers from '@test-helpers';
import { of } from 'rxjs';
import { TodoListComponent } from './todo-list.component';

describe('TodosListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;

  const getTodoListItemElements = (): DebugElement[] => fixture.debugElement.queryAll(By.css('li'));
  const getSingleTodoItemStatusText = (): DebugElement => fixture.debugElement.query(By.css('strong'));
  const getGoodsButton = (): DebugElement => fixture.debugElement.queryAll(By.css('button'))[0];
  const getClearButton = (): DebugElement => fixture.debugElement.queryAll(By.css('button'))[1];

  describe('Unit Tests', () => {
    let mockStore: MockStore;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [
          TodoListComponent
        ],
        providers: [
          provideMockStore({})
        ]
      }).compileComponents();
      mockStore = testHelpers.createMockStoreWithDispatchSpy();
      fixture = TestBed.createComponent(TodoListComponent);
      component = fixture.componentInstance;
    }));

    it('should be able to create component', () => {
      expect(component).toBeTruthy();
    });

    describe('Dispatching', () => {
      it('should dispatch for todo items when get goods clicked', () => {
        // TODO: For some reason, this makes random tests fail. Bootstrapping the app component issue?
        // TypeError: Cannot read property 'todoItems' of undefined.
        // testHelpers.clickDebugElement(fixture, getGoodsButton());

        component.getTheGoods();

        expect(mockStore.dispatch).toHaveBeenCalledWith(getTodos());
      });

      it('should dispatch for clearing todo items when clear clicked', () => {
        component.clear();

        expect(mockStore.dispatch).toHaveBeenCalledWith(clearTodos());
      });
    });

    describe('Listing Todo Items', () => {
      for (let i = 0; i <= 5; i++) {
        it(`should display an <li> element for each todo item in state (count: ${i})`, () => {
          const todoItems: TodoItem[] = Array.from({ length: i }, _ => ({} as TodoItem));
          setStateTodoItems(todoItems);

          const liElements = getTodoListItemElements();

          expect(liElements.length).toEqual(i);
        });
      }
    });

    describe('Displaying Todo Item Status', () => {
      [
        { title: 'complete', expectedStatus: 'Yep!', isComplete: true },
        { title: 'incomplete', expectedStatus: 'Nope', isComplete: false },
      ].forEach(testCase => {
        it(`should display ${testCase.title} todo item status`, () => {
          setStateTodoItems([{ completed: testCase.isComplete } as TodoItem]);

          const statusText = testHelpers.getDebugElementText(getSingleTodoItemStatusText());

          expect(statusText).toEqual(testCase.expectedStatus);
        });
      });
    });

    const setStateTodoItems = (todoItems: TodoItem[]): void => {
      mockStore.setState({ [todoFeatureName]: { todoItems } });
      fixture.detectChanges();
    };
  });

  describe('NgRx Store Integration Tests', () => {
    let todosServiceSpy: jasmine.SpyObj<TodosService>;

    beforeEach(async(() => {
      const todosServiceSpyObject = jasmine.createSpyObj('TodosService', ['getTodos']);
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          StoreModule.forFeature(todoFeatureName, { todoItems: todosReducer }),
          EffectsModule.forFeature([TodosEffects])
        ],
        declarations: [
          TodoListComponent
        ],
        providers: [
          { provide: TodosService, useValue: todosServiceSpyObject }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(TodoListComponent);
      component = fixture.componentInstance;
      todosServiceSpy = TestBed.inject<TodosService>(TodosService) as jasmine.SpyObj<TodosService>;
    }));

    it('should be able to create component', () => {
      expect(component).toBeTruthy();
    });

    it('should display todo items on click', () => {
      const expectedTodos: TodoItem[] = [{ title: 'buzz' } as TodoItem, { title: 'bar' } as TodoItem];
      todosServiceSpy.getTodos.and.returnValue(of(expectedTodos));
      testHelpers.clickDebugElement(fixture, getGoodsButton());

      const liElements = getTodoListItemElements();

      expect(liElements.length).toEqual(2);
      expect(testHelpers.getDebugElementText(liElements[0])).toContain(expectedTodos[0].title);
      expect(testHelpers.getDebugElementText(liElements[1])).toContain(expectedTodos[1].title);
    });

    it('should clear todo items on click', () => {
      const expectedTodos: TodoItem[] = [{} as TodoItem, {} as TodoItem];
      todosServiceSpy.getTodos.and.returnValue(of(expectedTodos));

      testHelpers.clickDebugElement(fixture, getGoodsButton());
      expect(getTodoListItemElements().length).toBeGreaterThan(0);

      testHelpers.clickDebugElement(fixture, getClearButton());
      expect(getTodoListItemElements().length).toEqual(0);
    });
  });

  describe('Full Integration Tests', () => {
    let actions$: Actions;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          StoreModule.forFeature(todoFeatureName, { todoItems: todosReducer }),
          EffectsModule.forFeature([TodosEffects]),
          HttpClientModule
        ],
        declarations: [
          TodoListComponent
        ],
        providers: [
          TodosService
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(TodoListComponent);
      component = fixture.componentInstance;
      actions$ = TestBed.inject(Actions);
    }));

    it('should be able to create component', () => {
      expect(component).toBeTruthy();
    });

    it('should display todo items from service on click', (done) => {
      testHelpers.clickDebugElement(fixture, getGoodsButton());

      actions$.pipe(ofType(getTodosSuccess)).subscribe(_ => {
        fixture.detectChanges();
        expect(getTodoListItemElements().length).toBeGreaterThan(0);
        done();
      });
    });
  });
});
