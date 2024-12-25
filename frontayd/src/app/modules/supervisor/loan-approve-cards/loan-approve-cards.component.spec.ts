import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApproveCardsComponent } from './loan-approve-cards.component';

describe('LoanApproveCardsComponent', () => {
  let component: LoanApproveCardsComponent;
  let fixture: ComponentFixture<LoanApproveCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApproveCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanApproveCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
