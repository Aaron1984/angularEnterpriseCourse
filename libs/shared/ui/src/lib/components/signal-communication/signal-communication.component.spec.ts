import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalCommunicationComponent } from './signal-communication.component';

describe('SignalCommunicationComponent', () => {
  let component: SignalCommunicationComponent;
  let fixture: ComponentFixture<SignalCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalCommunicationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
