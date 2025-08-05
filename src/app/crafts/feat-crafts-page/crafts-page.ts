import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CraftsStore } from '../+state/crafts.store';
import { StarshipCollection } from '../feat-starship-collection/starship-collection';
import { VehicleCollection } from '../feat-vehicle-collection/vehicle-collection';
import { CraftCollections } from '../model/craft';

@Component({
  imports: [UpperCasePipe, StarshipCollection, VehicleCollection],
  selector: 'app-crafts-page',
  host: {
    class: 'flex flex-col items-stretch gap-6',
  },
  template: `
    <section role="tablist" class="self-center tabs tabs-border tabs-xl">
      @for (collection of craftCollections; track $index) {
        <button
          class="tab"
          [class.tab-active]="store.selectedCollection() === collection"
          (click)="store.setSelectedCollection(collection)">
          {{ collection | uppercase }}
        </button>
      }
    </section>
    <input
      #filterInput
      type="text"
      placeholder="Search by name or model..."
      class="w-full input input-lg"
      [value]="store.filter()"
      (input)="store.setFilter(filterInput.value)" />
    @switch (store.selectedCollection()) {
      @case ('starships') {
        <app-starship-collection [filter]="store.filter()" />
      }
      @case ('vehicles') {
        <app-vehicle-collection [filter]="store.filter()" />
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CraftsPage {
  protected readonly store = inject(CraftsStore);
  protected readonly craftCollections = CraftCollections;
}
