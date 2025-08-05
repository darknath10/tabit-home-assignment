import { signalStore } from '@ngrx/signals';
import { withCraftCollection } from './craft-collection.feature';

export const StarshipsStore = signalStore({ providedIn: 'root' }, withCraftCollection('starships'));
