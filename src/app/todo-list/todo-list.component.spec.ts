import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { clearTodos, getTodos } from '@state/todos.actions';
import { createMockStoreWithDispatchSpy } from '@test-helpers';
import { TodoListComponent } from './todo-list.component';
import { DebugElement } from '@angular/core';
import { TodoItem } from '@state/todo-model';

describe('TodoListComponent', () => {
  const initialState = {};
  let mockStore: MockStore;

  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        TodoListComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();
    mockStore = createMockStoreWithDispatchSpy();
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  }));

  describe('Creation', () => {
    it('should be able to be created', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Dispatching', () => {
    it('should dispatch for todo items when get goods clicked', () => {
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

        const statusText = getDebugElementText(getSingleTodoItemStatusText());

        expect(statusText).toEqual(testCase.expectedStatus);
      });
    });
  });

  const setStateTodoItems = (todoItems: TodoItem[]): void => {
    mockStore.setState({ foo: { todoItems } });
    fixture.detectChanges();
  };

  const getTodoListItemElements = (): DebugElement[] => fixture.debugElement.queryAll(By.css('li'));
  const getSingleTodoItemStatusText = (): DebugElement => fixture.debugElement.query(By.css('strong'));

  const getDebugElementText = (element: DebugElement): string => element.nativeElement.textContent.trim();
});
