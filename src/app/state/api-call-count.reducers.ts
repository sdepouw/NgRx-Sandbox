import { createReducer, on } from '@ngrx/store';
import { incrementAPICallCount } from './api-call-count.actions';

export const initialState = 0;

export const apiCallCountReducer = createReducer(
    initialState,
    on(incrementAPICallCount, (state) => state + 1)
);
