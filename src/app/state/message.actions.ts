import { createAction, props } from '@ngrx/store';

export const displayMessage = createAction(
    '[Message] Display Message',
    props<{ message: string }>()
);

export const clearMessage = createAction(
    '[Message] Clear Message'
);
