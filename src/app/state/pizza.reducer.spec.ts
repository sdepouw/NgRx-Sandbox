import * as fromReducer from './pizza.reducer';
import { incrementAPICallCount } from './api-call-count.actions';


describe('Pizza Reducer', () => {
    describe('Unknown Action', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.pizzaReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('Increment API Action', () => {
        it('should toggle isCooked', () => {
            const { initialState } = fromReducer;
            const expectedState = { ...initialState, isCooked: true };
            const action = incrementAPICallCount();

            const state = fromReducer.pizzaReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(expectedState);
        });

        it('should match initial when called twice', () => {
            const { initialState } = fromReducer;
            const action = incrementAPICallCount();

            const firstNewState = fromReducer.pizzaReducer(initialState, action);
            const currentState = fromReducer.pizzaReducer(firstNewState, action);

            expect(currentState).toEqual(initialState);
            expect(currentState).not.toBe(initialState);
        });
    });
});
