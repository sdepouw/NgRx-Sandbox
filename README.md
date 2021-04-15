# NgRx Sandbox

## Notes

- Installed `@ngrx` packages, and proceeded to downgrade them from v11 due to compile error out of the box
- Created basic actions/reducers/selectors/effects
- Discovered that the declarations in `forRoot` must match with the `AppState` properties declared, otherwise the correct States won't happen
- Discovered you have to install a special package to get Redux extensions in browsers to pick up on your App State

## Feature Slice Notes
- `createFeatureSelector` seemingly shortcuts all the way down to the object?
  - Example: `AppState` has `foo: TodoState` property
  - `TodoState` has `todoItems: TodoItem[]`
  - `const fs = createFeatureSeelctor('foo')` and `createSelector(fs, (todoState: TodoState) => todoState.todoItems)` is what's needed to select.
- `StoreModule.forFeature('foo', { todoItems: todosReducer }),` here, the reducer is **just for the `todoItems` property!**
  - Like root, a different reducer is needed for each property, and a reducer **should only work with that one property!**

## Default Generated Stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
