import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectMessage = createSelector(
    (state: AppState) => state.message,
    (message: string) => message
);
