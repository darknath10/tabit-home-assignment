import { Directive, ElementRef, inject } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { filter, fromEvent, throttleTime } from 'rxjs';

@Directive({
  selector: '[appScrolledToBottomEmitter]',
  host: { class: 'overflow-auto' },
})
export class ScrolledToBottomEmitter {
  readonly #elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly scrolledToBottom = outputFromObservable(
    fromEvent(this.#elRef.nativeElement, 'scroll').pipe(
      throttleTime(15),
      filter(() => {
        const { clientHeight, scrollHeight, scrollTop } = this.#elRef.nativeElement;
        return clientHeight + scrollTop >= scrollHeight;
      }),
    ),
  );
}
