import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MoviesStore } from '../../core/movies/+state/movies.store';
import { StatTile } from '../../shared/ui/stat-tile';
import { CraftDetails as Craft, isStarship, isVehicle } from '../model/craft';

@Component({
  imports: [StatTile],
  selector: 'app-craft-details',
  host: { class: 'card card-border' },
  templateUrl: './craft-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CraftDetails<T extends Craft> {
  protected readonly moviesStore = inject(MoviesStore);
  readonly craft = input.required<T>();

  protected readonly craftClass = computed(() => {
    const craft = this.craft();
    return isVehicle(craft) ? craft.vehicleClass : isStarship(craft) ? craft.starshipClass : 'N/A';
  });

  protected readonly moviesCraftAppearsIn = computed(() => {
    const [isFulfilled, entityMap, { filmIds }] = [
      this.moviesStore.isFulfilled(),
      this.moviesStore.entityMap(),
      this.craft(),
    ];
    return isFulfilled ? filmIds.map((id) => entityMap[id].title) : [];
  });
}
