import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectCurrentAPICount = createSelector(
    (state: AppState) => state.apiCallCount,
    (apiCallCount: number) => apiCallCount
);
