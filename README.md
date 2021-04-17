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
  - That is, if you assign the reducer to the property instead of the whole state. See `PizzaState` for an example.

## Testing Selectors
- Using `projector()` works nicely, feeding it what will get *projected* (i.e. **after the first argument of the selector filters it down**) and testing the result
- `mySelector.projector(pizzaState)` is equivalent of the following:
  - `of(state).pipe(select(selectPizzaFeature)).subscribe(selected => { /* selected === pizzaState */ });`

## Hot vs. Cold Observables
- Cold Observables create their producers of data within the observable itself
  - Unicast / different execution for every subscription
  - Example: Making an API call within an observable
- Hot Observables use a producer created/etc. outside of the observable itself
  - Multicast / multiple subscriptions utilize the same producer
  - Example: Generate a random number, then have the Observable return the only-one-time generated number, every time

## Testing with Marbles
- Using `jasmine-marbles` NPM package: `npm i jasmine-marbles --save-dev`
- `hot()`: Creating an observable that is "already subscribed to"
- `cold()`: Creating an observable whose subscription starts when test begins
  - Based on the `-` frames, `cold()` waits for whatever calls it to happen within the test.
  - `hot()` will immediately start counting frames the instant everything starts.
- Not sure if these are the same as hot/cold observable definitions
- Testing Use Cases
  - Mocked Service API Calls
    - I'm mocking as `cold()` since each one produces its own API call
    - The [NgRx Documentation](https://ngrx.io/guide/effects/testing#marble-diagrams) sets them up this way
  - Effects Actions and Expected Observables: `hot()`
    - they have no data they produce themselves (not sure if this is correct)
    - The NgRx Documentation sets them up this way

## Mocking Notes
- To mock an API/Observable error
  - `todosServiceSpy.getTodos.and.returnValue(throwError(''));`
  - Writing as `todosServiceSpy.getTodos.and.throwError('');` is wrong apparently!
    - I think it makes the whole function call throw
    - In reality we just want the returned mocked API/HTTP call to return a status of "error"

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
