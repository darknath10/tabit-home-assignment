import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Craft } from '../model/craft';
import { CraftDetails } from '../ui-craft-details/craft-details';
import { VehicleStore } from './vehicle-page.store';

@Component({
  imports: [CraftDetails],
  selector: 'app-vehicle-page',
  template: `
    @let craft = store.craft();
    @if (store.isFulfilled() && craft) {
      <app-craft-details [craft]="craft" />
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
  providers: [VehicleStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclePage {
  readonly id = input.required<Craft['id']>();
  protected readonly store = inject(VehicleStore);

  constructor() {
    this.store.loadCraft(this.id);
  }
}
