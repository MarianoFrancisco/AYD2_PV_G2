import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapplicationsComponent } from './loanapplications.component';

describe('LoanapplicationsComponent', () => {
  let component: LoanapplicationsComponent;
  let fixture: ComponentFixture<LoanapplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanapplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
