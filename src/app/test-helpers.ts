import { select, Selector } from '@ngrx/store';
import { of } from 'rxjs';

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
