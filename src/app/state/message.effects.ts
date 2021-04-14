import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, debounceTime, mergeMap } from 'rxjs/operators';
import { displayMessage, clearMessage } from './message.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class MessageEffects {
    displayTimedMessage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(displayMessage),
                debounceTime(3000),
                tap(_ => this.store.dispatch(clearMessage()))
            )
    );

    constructor(
        private actions$: Actions,
        private store: Store
    ) { }
}
