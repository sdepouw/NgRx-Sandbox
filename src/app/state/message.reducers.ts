import { createReducer, on } from '@ngrx/store';
import { displayMessage, clearMessage } from './message.actions';

export const initialState = '';

export const messageReducer = createReducer(
    initialState,
    on(displayMessage, (_, { message }) => message),
    on(clearMessage, (_) => '')
);
