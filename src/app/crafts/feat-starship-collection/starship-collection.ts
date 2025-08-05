import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { StarshipsStore } from '../+state/starships.store';
import { CraftCollection } from '../ui-craft-collection/craft-collection';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CraftCollection, RouterLink],
  selector: 'app-starship-collection',
  host: { class: 'block' },
  template: `
    @if (!store.collectionIsEmpty()) {
      <app-craft-collection [crafts]="store.entities()" (bottomReached)="store.loadChunk(filter())">
        <ng-template #detailsLink let-id>
          <a [routerLink]="['/crafts/starships', id]">View Details</a>
        </ng-template>
      </app-craft-collection>
    }
    @if (store.isPending()) {
      <progress class="progress progress-accent w-full"></progress>
    }
    @if (store.error(); as error) {
      <div role="alert" class="alert alert-error alert-soft alert-vertical sm:alert-horizontal">
        <span>🚨</span>
        <span>{{ error }}</span>
        @if (store.collectionIsEmpty()) {
          <button class="btn btn-error btn-outline" (click)="store.loadChunk(filter())">Retry</button>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipCollection {
  protected readonly store = inject(StarshipsStore);
  readonly filter = input.required<string>();

  constructor() {
    this.store.search(this.filter);
  }
}
