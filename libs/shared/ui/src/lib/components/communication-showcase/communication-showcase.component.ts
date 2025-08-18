import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { CustomTextComponent } from '../custom-text/custom-text.component';
import { ClassicCommunicationComponent } from '../classic-communication/classic-communication.component';
import { SignalCommunicationComponent } from '../signal-communication/signal-communication.component';

@Component({
  selector: 'lib-communication-showcase',
  imports: [
    ClassicCommunicationComponent,
    SignalCommunicationComponent,
    CustomTextComponent
  ],
  templateUrl: './communication-showcase.component.html',
  styleUrl: './communication-showcase.component.scss',
})
export class CommunicationShowcaseComponent implements AfterViewInit{
  @ViewChild('customText', { static: false }) customText!: CustomTextComponent;

  classicName = 'Resergo classic';
  signalName = signal('Samu es tonto');

  ngAfterViewInit() {
    this.customText.textSignal = this.signalName;
  }

  updateClassicName(newValue: string) {
    this.classicName = newValue;
  }

  updateSignalName(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.signalName.set(value);
  }
}

