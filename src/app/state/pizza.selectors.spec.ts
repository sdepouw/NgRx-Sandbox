import { select, Selector } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState, PizzaState } from './app.state';
import { isThePizzaReady, selectPizzaFeature } from './pizza.selectors';

describe('Pizza Selectors', () => {
  describe('Pizza Feature', () => {
    it('should project PizzaState', () => {
      const pizzaState = { isCooked: true, description: 'hello' } as PizzaState;
      const state: AppState = { pizza: pizzaState } as AppState;
      testFeatureSelectorProjection<AppState, PizzaState>(state, (s: AppState) => s.pizza, selectPizzaFeature);
    });
  });

  describe('Is the Pizza Ready', () => {
    const isCookedStates = [true, false];
    isCookedStates.forEach(isCooked => {
      it(`should return ${isCooked} when isCooked is ${isCooked}`, () => {
        const pizzaState = { isCooked };
        const result = isThePizzaReady.projector(pizzaState);
        expect(result).toEqual(isCooked);
      });
    });
  });
});

// TODO: Move to common spot.
export function testFeatureSelectorProjection<TAppState, TProjection>(
  state: TAppState,
  expectedProjection: (s: TAppState) => TProjection,
  selector: Selector<TAppState, unknown>, // Trying to set "unknown" as "TProjection" breaks compilation.
  customFailMessage = 'Selector did not project correctly'): void {
  const expectedResult = expectedProjection(state);
  of(state).pipe(select(selector)).subscribe(result => {
    let expectActualResult = expect(result);
    if (customFailMessage && customFailMessage.length > 0) {
      expectActualResult = expectActualResult.withContext(customFailMessage);
    }
    expectActualResult.toBe(expectedResult);
  });
}
