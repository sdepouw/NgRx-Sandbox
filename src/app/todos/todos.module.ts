import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { todoListTitleReducer } from '@state-todos/todo-list-title.reducers';
import { TodosEffects } from '@state-todos/todos.effects';
import { todosReducer } from '@state-todos/todos.reducers';
import { todoFeatureName } from '@state-todos/todos.selectors';
import { TodoListComponent } from '@todos/todo-list/todo-list.component';

@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(todoFeatureName, { todoItems: todosReducer, todoListTitle: todoListTitleReducer }),
    EffectsModule.forFeature([TodosEffects]),
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodosModule { }
