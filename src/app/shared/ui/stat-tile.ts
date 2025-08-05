import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-tile',
  host: { class: 'stat bg-base-200 rounded-lg shadow-lg' },
  template: `
    <div class="stat-title">{{ title() }}</div>
    <div class="stat-value">{{ value() }}</div>
    @if (description()) {
      <div class="stat-desc">{{ description() }}</div>
    }
  `,
})
export class StatTile {
  readonly description = input<string>();
  readonly title = input.required<string>();
  readonly value = input.required<string>();
}
