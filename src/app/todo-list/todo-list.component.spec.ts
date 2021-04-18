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

  it('should be able to be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch for todo items when get goods clicked', () => {
    component.getTheGoods();

    expect(mockStore.dispatch).toHaveBeenCalledWith(getTodos());
  });

  it('should dispatch for clearing todo items when clear clicked', () => {
    component.clear();

    expect(mockStore.dispatch).toHaveBeenCalledWith(clearTodos());
  });

  it('should have empty list when state has no todo items', () => {
    expect(getTodoListItemElements().length).toEqual(0);
  });

  for (let i = 0; i <= 5; i++) {
    it(`should display an <li> element for each todo item in state (count: ${i})`, () => {
      setStateTodoItems(i);

      const liElements = getTodoListItemElements();

      expect(liElements.length).toEqual(i);
    });
  }

  function setStateTodoItems(todoItemCount: number): void {
    const todoItems: TodoItem[] = Array.from({ length: todoItemCount }, _ => ({} as TodoItem));
    mockStore.setState({ foo: { todoItems } });
    fixture.detectChanges();
  }

  function getTodoListItemElements(): DebugElement[] {
    return fixture.debugElement.queryAll(By.css('li'));
  }
});
