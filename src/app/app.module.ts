import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { apiCallCountReducer } from './state/api-call-count.reducers';
import { MessageEffects } from './state/message.effects';
import { messageReducer } from './state/message.reducers';
import { pizzaReducer } from './state/pizza.reducer';
import { pizzaFeatureName } from './state/pizza.selectors';
import { todoListTitleReducer } from './state/todo-list-title.reducers';
import { TodosEffects } from './state/todos.effects';
import { todosReducer } from './state/todos.reducers';
import { todoFeatureName } from './state/todos.selectors';
import { TodoListComponent } from './todo-list/todo-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ apiCallCount: apiCallCountReducer, message: messageReducer }),
    EffectsModule.forRoot([MessageEffects]),
    StoreModule.forFeature(todoFeatureName, { todoItems: todosReducer, todoListTitle: todoListTitleReducer }),
    EffectsModule.forFeature([TodosEffects]),
    StoreModule.forFeature(pizzaFeatureName, pizzaReducer),
    StoreDevtoolsModule.instrument(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
