import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationShowcaseComponent } from './communication-showcase.component';

describe('CommunicationShowcaseComponent', () => {
  let component: CommunicationShowcaseComponent;
  let fixture: ComponentFixture<CommunicationShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationShowcaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
