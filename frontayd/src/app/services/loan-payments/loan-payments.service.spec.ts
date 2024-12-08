import { TestBed } from '@angular/core/testing';

import { LoanPaymentsService } from './loan-payments.service';

describe('LoanPaymentsService', () => {
  let service: LoanPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
