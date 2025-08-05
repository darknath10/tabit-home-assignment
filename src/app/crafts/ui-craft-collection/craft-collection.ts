import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, input, TemplateRef } from '@angular/core';
import { ScrolledToBottomEmitter } from '../../shared/directives/scrolled-to-bottom.emitter';
import { Craft } from '../model/craft';

@Component({
  imports: [NgTemplateOutlet],
  selector: 'app-craft-collection',
  host: { class: 'block h-[30rem]' },
  hostDirectives: [
    {
      directive: ScrolledToBottomEmitter,
      outputs: ['scrolledToBottom: bottomReached'],
    },
  ],
  template: `
    <table class="table table-pin-rows table-sm sm:table-md">
      <thead class="bg-base-200">
        <tr>
          <th>Name</th>
          <th>Model</th>
          <th>Manufacturer</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        @for (craft of crafts(); track craft.id) {
          <tr>
            <td>{{ craft.name }}</td>
            <td>{{ craft.model }}</td>
            <td>{{ craft.manufacturer }}</td>
            <td>
              <ng-container [ngTemplateOutlet]="detailsLink()" [ngTemplateOutletContext]="{ $implicit: craft.id }" />
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CraftCollection {
  readonly crafts = input.required<Craft[]>();
  readonly detailsLink = contentChild.required('detailsLink', {
    read: TemplateRef,
  });
}
