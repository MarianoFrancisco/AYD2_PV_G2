import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsRegisterComponent } from './complaints-register.component';

describe('ComplaintsRegisterComponent', () => {
  let component: ComplaintsRegisterComponent;
  let fixture: ComponentFixture<ComplaintsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
