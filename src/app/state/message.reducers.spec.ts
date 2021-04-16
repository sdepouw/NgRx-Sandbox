import * as fromReducer from './message.reducers';
import { displayMessage } from './message.actions';

describe('Message Reducer', () => {
    describe('Unknown Action', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.messageReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('Display Action', () => {
        it('should set message to given message', () => {
            const { initialState } = fromReducer;
            const expectedState = 'expected message';
            const action = displayMessage({ message: expectedState });

            const state = fromReducer.messageReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });
    });
});
