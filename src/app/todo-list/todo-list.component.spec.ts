import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  const initialState = {};
  let mockStore: MockStore;

  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        // EffectsModule.forRoot(),
      ],
      declarations: [
        TodoListComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  }));

  it('should be able to be created', () => {
    expect(component).toBeTruthy();
  });

  xit('should dispatch for todo items when get goods clicked', () => {
    // component.getTheGoods();

    // Doesn't exist on 10.2.1
    // expect(mockStore.dispatchedActions$
  });
});
