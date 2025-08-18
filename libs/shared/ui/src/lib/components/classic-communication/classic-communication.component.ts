import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-classic-communication',
  imports: [],
  templateUrl: './classic-communication.component.html',
  styleUrl: './classic-communication.component.scss',
})
export class ClassicCommunicationComponent {
  @Input() name = '';
  @Output() nameChanged = new EventEmitter<string>();

  onNameInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.nameChanged.emit(value);
  }
}
