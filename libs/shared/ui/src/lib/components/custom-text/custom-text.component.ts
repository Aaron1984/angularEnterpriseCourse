import { Component, WritableSignal } from '@angular/core';

@Component({
  selector: 'lib-custom-text',
  imports: [],
  templateUrl: './custom-text.component.html',
  styleUrl: './custom-text.component.scss',
})
export class CustomTextComponent {
  public textSignal!: WritableSignal<string>;

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.textSignal.set(value);
  }
}
