import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, Observable, pipe, tap } from 'rxjs';
import { setError, setFulfilled, setPending, withRequestStatus } from '../../shared/+state/request-status.feature';
import { CraftDetails } from '../model/craft';

export function withCraftDetails<T extends CraftDetails>(fetchCraftFn: (id: T['id']) => Observable<T>) {
  return signalStoreFeature(
    withState<{ craft: T | null }>({ craft: null }),
    withRequestStatus(),
    withMethods((store) => ({
      loadCraft: rxMethod<T['id']>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap((id) =>
            fetchCraftFn(id).pipe(
              tapResponse({
                next: (craft) => patchState(store, setFulfilled(), { craft }),
                error: (error: Error) => patchState(store, setError(error.message)),
              }),
            ),
          ),
        ),
      ),
    })),
  );
}
