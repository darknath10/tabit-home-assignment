import { signalStore } from '@ngrx/signals';
import { withCraftCollection } from './craft-collection.feature';

export const VehiclesStore = signalStore({ providedIn: 'root' }, withCraftCollection('vehicles'));
