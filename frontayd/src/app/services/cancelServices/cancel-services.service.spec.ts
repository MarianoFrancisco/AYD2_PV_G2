import { TestBed } from '@angular/core/testing';

import { CancelServicesService } from './cancel-services.service';

describe('CancelServicesService', () => {
  let service: CancelServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
