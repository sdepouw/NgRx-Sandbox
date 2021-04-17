import { testFeatureSelectorProjection } from '@app/test-helpers.ts';
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
