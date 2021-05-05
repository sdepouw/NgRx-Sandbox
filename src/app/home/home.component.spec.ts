import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { clearTodos, getTodosSuccess } from '@state-todos/todos.actions';
import { selectTodoTitle } from '@state-todos/todos.selectors';
import { selectCurrentAPICount } from '@state/api-call-count.selectors';
import { displayMessage } from '@state/message.actions';
import { selectMessage } from '@state/message.selectors';
import { isThePizzaReady } from '@state/pizza.selectors';
import * as testHelpers from '@test-helpers';
import { TodoListComponent } from '@todos/todo-list/todo-list.component';
import { MockComponent } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { HomeComponent } from './home.component';

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

  it('should display message when TODOs are gotten', () => {
    // Only use Marbles testing when you care about exactly when events happen.
    // Things like this are better kept within Effects, generally.
    // In our case, maybe want to handle message displays there via some global state.
    // For now, we'll test with of().
    actions$ = of(getTodosSuccess({ todoItems: [] }));

    // This cannot be called until after we set actions$, as the first call to this calls ngOnInit().
    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(displayMessage({ message: 'Successfully Got!' }));
  });

  it('should display message when TODOs are cleared', () => {
    actions$ = of(clearTodos());

    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(displayMessage({ message: 'All Cleaned Up!' }));
  });
});
