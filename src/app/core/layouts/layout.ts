import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  host: { class: 'h-full flex flex-col' },
  template: `
    <nav class="navbar bg-base-300">
      <div class="navbar-start"></div>
      <div class="navbar-center text-4xl">Star Wars Crafts</div>
      <div class="navbar-end"></div>
    </nav>
    <main class="flex-1 p-4">
      <ng-content />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {}
