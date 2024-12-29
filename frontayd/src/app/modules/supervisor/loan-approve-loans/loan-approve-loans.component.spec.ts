import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApproveLoansComponent } from './loan-approve-loans.component';

describe('LoanApproveLoansComponent', () => {
  let component: LoanApproveLoansComponent;
  let fixture: ComponentFixture<LoanApproveLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApproveLoansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanApproveLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
