import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'crafts',
    children: [
      {
        path: 'starships/:id',
        loadComponent: async () => (await import('./crafts/feat-starship-page/starship-page')).StarshipPage,
      },
      {
        path: 'vehicles/:id',
        loadComponent: async () => (await import('./crafts/feat-vehicle-page/vehicle-page')).VehiclePage,
      },
      {
        path: '',
        loadComponent: async () => (await import('./crafts/feat-crafts-page/crafts-page')).CraftsPage,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'crafts',
    pathMatch: 'full',
  },
];
