import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { apiCallCountReducer } from './state/api-call-count.reducers';
import { MessageEffects } from './state/message.effects';
import { messageReducer } from './state/message.reducers';
import { pizzaReducer } from './state/pizza.reducer';
import { pizzaFeatureName } from './state/pizza.selectors';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodosModule } from './todos/todos.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ apiCallCount: apiCallCountReducer, message: messageReducer }),
    EffectsModule.forRoot([MessageEffects]),
    StoreModule.forFeature(pizzaFeatureName, pizzaReducer),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    TodosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
