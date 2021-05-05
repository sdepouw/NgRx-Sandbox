import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getTodosSuccess } from '@state-todos/todos.actions';
import { displayMessage } from '@state/message.actions';
import * as testHelpers from '@test-helpers';
import { TodoListComponent } from '@todos/todo-list/todo-list.component';
import { hot } from 'jasmine-marbles';
import { MockComponent } from 'ng-mocks';
import { Observable } from 'rxjs';
import { HomeComponent } from './home.component';
import { selectTodoTitle } from '@state-todos/todos.selectors';
import { selectCurrentAPICount } from '@state/api-call-count.selectors';
import { selectMessage } from '@state/message.selectors';
import { isThePizzaReady } from '@state/pizza.selectors';

describe('HomeComponent', () => {
  const initialState = {};
  let mockStore: MockStore;
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let actions$: Observable<Action>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
      ],
      declarations: [
        HomeComponent,
        MockComponent(TodoListComponent)
      ],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$)
      ]
    }).compileComponents();

    mockStore = testHelpers.createMockStoreWithDispatchSpy();
    mockStore.overrideSelector(selectTodoTitle, 'Foo');
    mockStore.overrideSelector(selectCurrentAPICount, 5);
    mockStore.overrideSelector(selectMessage, 'Bar');
    mockStore.overrideSelector(isThePizzaReady, true);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // TODO: This test is currently failing, because the Action subscription is never getting called.
  xit('should display message when TODOs are gotten', () => {
    actions$ = hot('----a--', { a: getTodosSuccess({ todoItems: [] }) });

    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(displayMessage({ message: 'Successfully Got!' }));
  });
});
