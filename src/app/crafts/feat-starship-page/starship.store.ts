import { inject } from '@angular/core';
import { signalStore, withFeature, withProps } from '@ngrx/signals';
import { withCraftDetails } from '../+state/craft-details.feature';
import { CRAFT_REPOSITORY } from '../infra/craft-repository';

export const StarshipStore = signalStore(
  withProps(() => ({
    _repo: inject(CRAFT_REPOSITORY),
  })),
  withFeature(({ _repo }) => withCraftDetails(_repo.fetchStarshipById)),
);
