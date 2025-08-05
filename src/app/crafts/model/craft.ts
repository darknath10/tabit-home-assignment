import { Movie } from '../../core/movies/model/movie';

export const CraftCollections = ['starships', 'vehicles'] as const;

export type CraftCollection = (typeof CraftCollections)[number];

export type Craft = {
  id: string;
  manufacturer: string;
  model: string;
  name: string;
};

export type CraftDetails = Craft & {
  cargoCapacity: string;
  consumables: string;
  costInCredits: string;
  created: Date;
  crew: string;
  edited: Date;
  filmIds: Array<Movie['id']>;
  length: string;
  maxAtmosphericSpeed: string;
  passengers: string;
};

export type Vehicle = CraftDetails & {
  vehicleClass: string;
};

export type Starship = CraftDetails & {
  hyperdriveRating: string;
  mglt: string;
  starshipClass: string;
};

export function isVehicle(craft: CraftDetails): craft is Vehicle {
  return 'vehicleClass' in craft;
}

export function isStarship(craft: CraftDetails): craft is Starship {
  return 'starshipClass' in craft;
}
