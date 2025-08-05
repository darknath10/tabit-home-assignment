import { HttpClient } from '@angular/common/http';
import { inject, Provider } from '@angular/core';
import { catchError } from 'rxjs';
import {
  mapSwapiResponse,
  mapToStarship,
  mapToVehicle,
  StarshipDto,
  SwapiResponse,
  VehicleDto,
} from './craft-dto.swapi';
import { CRAFT_REPOSITORY, CraftRepository } from './craft-repository';

function swapiCraftRepositoryFactory(): CraftRepository {
  const http = inject(HttpClient);
  const baseUrl = 'https://swapi.py4e.com/api';

  return {
    fetchCrafts({ collection, offset, searchTerm }) {
      const limit = 10;
      const page = Math.floor(offset / limit) + 1;
      const url = `${baseUrl}/${collection.toLowerCase()}/?page=${page}`;
      return http.get<SwapiResponse>(url, { params: { search: searchTerm, page } }).pipe(
        mapSwapiResponse(),
        catchError(() => {
          throw new Error(`Failed to load ${collection}`);
        }),
      );
    },
    fetchStarshipById(id) {
      const url = `${baseUrl}/starships/${id}`;
      return http.get<StarshipDto>(url).pipe(
        mapToStarship(),
        catchError(() => {
          throw new Error('Failed to load starship details');
        }),
      );
    },
    fetchVehicleById(id) {
      const url = `${baseUrl}/vehicles/${id}`;
      return http.get<VehicleDto>(url).pipe(
        mapToVehicle(),
        catchError(() => {
          throw new Error('Failed to load vehicle details');
        }),
      );
    },
  };
}

export function provideCraftRepositorySwapi(): Provider {
  return {
    provide: CRAFT_REPOSITORY,
    useFactory: swapiCraftRepositoryFactory,
  };
}
