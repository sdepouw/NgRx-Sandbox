import { select, Selector } from '@ngrx/store';
import { Observable, of } from 'rxjs';

export function testFeatureSelectorProjection<TAppState, TProjection>(
  state: TAppState,
  expectedProjection: (s: TAppState) => TProjection,
  selector: Selector<TAppState, unknown>, // Trying to set "unknown" as "TProjection" breaks compilation.
  customFailMessage = 'Selector did not project correctly'): void {
  const expectedResult = expectedProjection(state);
  of(state).pipe(select(selector)).subscribe(result => {
    let expectActualResult = expect(result);
    if (customFailMessage && customFailMessage.length > 0) {
      expectActualResult = expectActualResult.withContext(customFailMessage);
    }
    expectActualResult.toBe(expectedResult);
  });
}

export function expectObservableToReturn<T>(observable: Observable<T>): void {
  let nextCount = 0;
  let errorCount = 0;
  let completeCount = 0;

  // EMPTY completes without emitting next or error.
  observable.subscribe(
    () => { nextCount++; },
    () => { errorCount++; },
    () => { completeCount++; }
  );

  expect(nextCount).withContext('Next Count').toEqual(0);
  expect(errorCount).withContext('Error Count').toEqual(0);
  expect(completeCount).withContext('Complete Count').toEqual(1);
}
