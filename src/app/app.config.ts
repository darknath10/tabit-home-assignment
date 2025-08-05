import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideMovieRepositorySwapi } from './core/movies/infra/movie-repository.swapi';
import { provideCraftRepositorySwapi } from './crafts/infra/craft-repository.swapi';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(),
    provideCraftRepositorySwapi(),
    provideMovieRepositorySwapi(),
  ],
};
