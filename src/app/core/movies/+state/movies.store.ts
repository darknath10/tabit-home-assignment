import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withProps } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import { setError, setFulfilled, setPending, withRequestStatus } from '../../../shared/+state/request-status.feature';
import { MOVIE_REPOSITORY } from '../infra/movie-repository';
import { Movie } from '../model/movie';

export const MoviesStore = signalStore(
  { providedIn: 'root' },
  withRequestStatus(),
  withEntities<Movie>(),
  withProps(() => ({
    _repo: inject(MOVIE_REPOSITORY),
  })),
  withMethods((store) => ({
    loadMovies: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        exhaustMap(() =>
          store._repo.fetchAll().pipe(
            tapResponse({
              next: (movies) => patchState(store, setEntities(movies), setFulfilled()),
              error: (error: Error) => patchState(store, setError(error.message)),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadMovies();
    },
  }),
);
