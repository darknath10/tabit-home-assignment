import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Craft, CraftCollection, Starship, Vehicle } from '../model/craft';

export interface CraftRepository {
  fetchCrafts(params: {
    collection: CraftCollection;
    offset: number;
    searchTerm: string;
  }): Observable<{ crafts: Craft[]; total: number }>;
  fetchStarshipById(id: Craft['id']): Observable<Starship>;
  fetchVehicleById(id: Craft['id']): Observable<Vehicle>;
}

export const CRAFT_REPOSITORY = new InjectionToken<CraftRepository>('Craft Repository');
