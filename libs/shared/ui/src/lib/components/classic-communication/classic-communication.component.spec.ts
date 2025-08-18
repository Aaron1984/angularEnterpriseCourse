import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassicCommunicationComponent } from './classic-communication.component';

describe('ClassicCommunicationComponent', () => {
  let component: ClassicCommunicationComponent;
  let fixture: ComponentFixture<ClassicCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicCommunicationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassicCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
