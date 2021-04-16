import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodosEffects } from './state/todos.effects';
import { EffectsModule } from '@ngrx/effects';
import { todosReducer, todoListTitleReducer } from './state/todos.reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { apiCallCountReducer } from './state/api-call-count.reducers';
import { messageReducer } from './state/message.reducers';
import { MessageEffects } from './state/message.effects';
import { pizzaReducer } from './state/pizza.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ apiCallCount: apiCallCountReducer, message: messageReducer }),
    EffectsModule.forRoot([MessageEffects]),
    StoreModule.forFeature('foo', { todoItems: todosReducer, todoListTitle: todoListTitleReducer }),
    EffectsModule.forFeature([TodosEffects]),
    StoreModule.forFeature('pizza', pizzaReducer),
    StoreDevtoolsModule.instrument(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
