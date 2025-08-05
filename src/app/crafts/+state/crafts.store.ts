import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CraftCollection } from '../model/craft';

export const CraftsStore = signalStore(
  { providedIn: 'root' },
  withState<{
    filter: string;
    selectedCollection: CraftCollection;
  }>({
    filter: '',
    selectedCollection: 'starships',
  }),
  withMethods((store) => ({
    setFilter(filter: string) {
      patchState(store, { filter });
    },
    setSelectedCollection(selectedCollection: CraftCollection) {
      patchState(store, { selectedCollection });
    },
  })),
);
