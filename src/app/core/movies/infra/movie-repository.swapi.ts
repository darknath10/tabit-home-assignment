import { HttpClient } from '@angular/common/http';
import { inject, Provider } from '@angular/core';
import { catchError } from 'rxjs';
import { mapSwapiResponse, SwapiResponse } from './movie-dto.swapi';
import { MOVIE_REPOSITORY, MovieRepository } from './movie-repository';

function movieRepositorySwapiFactory(): MovieRepository {
  const http = inject(HttpClient);
  const url = 'https://swapi.py4e.com/api/films';

  return {
    fetchAll() {
      return http.get<SwapiResponse>(url).pipe(
        mapSwapiResponse(),
        catchError(() => {
          throw new Error('Failed to retreive movies');
        }),
      );
    },
  };
}

export function provideMovieRepositorySwapi(): Provider {
  return {
    provide: MOVIE_REPOSITORY,
    useFactory: movieRepositorySwapiFactory,
  };
}
