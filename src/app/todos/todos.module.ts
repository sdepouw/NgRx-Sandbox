import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { todoListTitleReducer } from '@state/todo-list-title.reducers';
import { TodosEffects } from '@state/todos.effects';
import { todosReducer } from '@state/todos.reducers';
import { todoFeatureName } from '@state/todos.selectors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(todoFeatureName, { todoItems: todosReducer, todoListTitle: todoListTitleReducer }),
    EffectsModule.forFeature([TodosEffects]),
  ]
})
export class TodosModule { }
