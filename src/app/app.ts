import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './core/layouts/layout';

@Component({
  selector: 'app-root',
  imports: [Layout, RouterOutlet],
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('star-wars-crafts');
}
