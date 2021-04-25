import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { apiCallCountReducer } from '@state/api-call-count.reducers';
import { MessageEffects } from '@state/message.effects';
import { messageReducer } from '@state/message.reducers';
import { pizzaReducer } from '@state/pizza.reducer';
import { pizzaFeatureName } from '@state/pizza.selectors';
import { TodosModule } from '@todos/todos.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
