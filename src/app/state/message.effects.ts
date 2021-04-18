import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, debounceTime } from 'rxjs/operators';
import { displayMessage, clearMessage } from './message.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class MessageEffects {
  displayTimedMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(displayMessage),
        debounceTime(3000), // TODO: Inject timeout via displayMessage action?
        tap(_ => this.store.dispatch(clearMessage()))
      ),
    // dispatch: false the re-dispatch of displayMessage.
    // Since we're not piping into another Action to dispatch, it re-dispatches.
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store
  ) { }
}
