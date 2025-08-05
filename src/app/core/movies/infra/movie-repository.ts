import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

export interface MovieRepository {
  fetchAll(): Observable<Movie[]>;
}

export const MOVIE_REPOSITORY = new InjectionToken<MovieRepository>('Movie Repository');
