import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'lib-signal-communication',
  imports: [],
  templateUrl: './signal-communication.component.html',
  styleUrl: './signal-communication.component.scss',
})
export class SignalCommunicationComponent {
  name = input('');

  constructor() {
    effect(() => {
      console.log('Signal value changed:', this.name());
    });
  }
}
