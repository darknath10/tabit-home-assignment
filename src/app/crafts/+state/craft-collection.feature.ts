import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { addEntities, removeAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, exhaustMap, filter, pipe, switchMap, tap } from 'rxjs';
import { setError, setFulfilled, setPending, withRequestStatus } from '../../shared/+state/request-status.feature';
import { CRAFT_REPOSITORY } from '../infra/craft-repository';
import { Craft, CraftCollection } from '../model/craft';

export function withCraftCollection(collection: CraftCollection) {
  return signalStoreFeature(
    withState<{ total: number | null }>({
      total: null,
    }),
    withRequestStatus(),
    withEntities<Craft>(),
    withProps(() => ({
      repo: inject(CRAFT_REPOSITORY),
    })),
    withComputed(({ entities, total }) => ({
      collectionFullyLoaded: computed(() => entities().length === total()),
      collectionIsEmpty: computed(() => !entities().length),
    })),
    withMethods((store) => {
      const fetchCraftsAndUpdateState = (offset: number, searchTerm: string) =>
        store.repo.fetchCrafts({ collection, offset, searchTerm }).pipe(
          tapResponse({
            next: ({ crafts, total }) => patchState(store, { total }, setFulfilled(), addEntities(crafts)),
            error: (error: Error) => patchState(store, setError(error.message)),
          }),
        );

      const loadChunk = rxMethod<string>(
        pipe(
          filter(() => !store.collectionFullyLoaded()),
          tap(() => patchState(store, setPending())),
          exhaustMap((searchTerm) => fetchCraftsAndUpdateState(store.entities().length, searchTerm)),
        ),
      );

      const search = rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { total: null }, setPending(), removeAllEntities())),
          switchMap((searchTerm) => fetchCraftsAndUpdateState(store.entities().length, searchTerm)),
        ),
      );

      return { loadChunk, search };
    }),
  );
}
