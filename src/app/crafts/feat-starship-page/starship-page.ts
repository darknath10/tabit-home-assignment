import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { StatTile } from '../../shared/ui/stat-tile';
import { Craft } from '../model/craft';
import { CraftDetails } from '../ui-craft-details/craft-details';
import { StarshipStore } from './starship.store';

@Component({
  imports: [CraftDetails, StatTile],
  selector: 'app-starship-page',
  template: `
    @let craft = store.craft();
    @if (store.isFulfilled() && craft) {
      <app-craft-details [craft]="craft">
        <ng-container ngProjectAs="[extra-stats]">
          <app-stat-tile title="Hyperdrive Rating" [value]="craft.hyperdriveRating" />
          <app-stat-tile title="Max Megalights" [value]="craft.mglt" description="per hour" />
        </ng-container>
      </app-craft-details>
    }
    @if (store.isPending()) {
      <div class="flex justify-center gap-2">
        <span class="loading loading-spinner loading-lg text-accent"></span>
        <span>Loading starship info...</span>
      </div>
    }
    @if (store.error(); as error) {
      <div role="alert" class="alert alert-error alert-soft alert-vertical sm:alert-horizontal">
        <span>🚨</span>
        <span>{{ error }}</span>
        <button class="btn btn-error btn-outline" (click)="store.loadCraft(this.id())">Retry</button>
      </div>
    }
  `,
  providers: [StarshipStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipPage {
  readonly id = input.required<Craft['id']>();
  protected readonly store = inject(StarshipStore);

  constructor() {
    this.store.loadCraft(this.id);
  }
}
