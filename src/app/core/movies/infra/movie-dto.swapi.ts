import { map, Observable } from 'rxjs';
import { Movie } from '../model/movie';

export type SwapiResponse = { results: Array<{ title: string; url: string }> };

export function mapSwapiResponse() {
  return (source$: Observable<SwapiResponse>): Observable<Movie[]> =>
    source$.pipe(map(({ results }) => results.map(({ title, url }) => ({ id: getIdFromUrl(url), title }))));
}

function getIdFromUrl(url: string) {
  const { pathname } = new URL(url);
  const { length, [length - 1]: id } = pathname.split('/').filter((segment) => segment);
  return id;
}
