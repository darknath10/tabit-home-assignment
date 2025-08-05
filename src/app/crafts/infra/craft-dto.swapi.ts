import { map, Observable } from 'rxjs';
import { Craft, CraftDetails, Starship, Vehicle } from '../model/craft';

type CraftDto = {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  films: string[];
  length: string;
  manufacturer: string;
  max_atmospheric_speed: string;
  model: string;
  name: string;
  passengers: string;
  url: string;
};

export type VehicleDto = CraftDto & {
  vehicle_class: string;
};

export type StarshipDto = CraftDto & {
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
};

export type SwapiResponse = {
  count: number;
  results: Array<Pick<CraftDto, 'manufacturer' | 'model' | 'name' | 'url'>>;
};

export function mapSwapiResponse() {
  return (source$: Observable<SwapiResponse>): Observable<{ crafts: Craft[]; total: number }> =>
    source$.pipe(
      map(({ count, results }) => ({
        crafts: results.map((dto) => ({
          id: getIdFromUrl(dto.url),
          manufacturer: dto.manufacturer,
          model: dto.model,
          name: dto.name,
        })),
        total: count,
      })),
    );
}

export function mapToVehicle() {
  return (source$: Observable<VehicleDto>): Observable<Vehicle> => source$.pipe(map(toVehicle));
}

export function mapToStarship() {
  return (source$: Observable<StarshipDto>): Observable<Starship> => source$.pipe(map(toStarship));
}

function mapCraftDto(dto: CraftDto): CraftDetails {
  return {
    id: getIdFromUrl(dto.url),
    cargoCapacity: dto.cargo_capacity,
    consumables: dto.consumables,
    costInCredits: dto.cost_in_credits,
    created: new Date(dto.created),
    crew: dto.crew,
    edited: new Date(dto.edited),
    filmIds: dto.films.map((filmUrl) => getIdFromUrl(filmUrl)),
    length: dto.length,
    manufacturer: dto.manufacturer,
    maxAtmosphericSpeed: dto.max_atmospheric_speed,
    model: dto.model,
    name: dto.name,
    passengers: dto.passengers,
  };
}

function toVehicle(dto: VehicleDto): Vehicle {
  return {
    ...mapCraftDto(dto),
    vehicleClass: dto.vehicle_class,
  };
}

function toStarship(dto: StarshipDto): Starship {
  return {
    ...mapCraftDto(dto),
    hyperdriveRating: dto.hyperdrive_rating,
    mglt: dto.MGLT,
    starshipClass: dto.starship_class,
  };
}

function getIdFromUrl(url: string) {
  const { pathname } = new URL(url);
  const { length, [length - 1]: id } = pathname.split('/').filter((segment) => segment);
  return id;
}
