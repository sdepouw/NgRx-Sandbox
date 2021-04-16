import { createReducer, on } from '@ngrx/store';
import { PizzaState } from './app.state';
import { incrementAPICallCount } from './api-call-count.actions';

const initialState: PizzaState = { isCooked: false, description: '' };

export const pizzaReducer = createReducer(
    initialState,
    on(incrementAPICallCount, (existingState) => ({ ...existingState, isCooked: !existingState.isCooked }))
);
