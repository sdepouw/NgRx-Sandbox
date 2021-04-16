import { PizzaState } from './app.state';
import { selectPizzaFeature, isThePizzaReady } from './pizza.selectors';

describe('Pizza Selectors', () => {
  describe('Pizza Feature', () => {
    it('should return the projected PizzaState', () => {
      const expectedPizzaState: PizzaState = { isCooked: true, description: 'hello' };
      const result = selectPizzaFeature.projector(expectedPizzaState);
      expect(result).toBe(expectedPizzaState);
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
