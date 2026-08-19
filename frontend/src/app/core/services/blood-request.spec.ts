import { TestBed } from '@angular/core/testing';

import { BloodRequestService } from './blood-request';

describe('BloodRequest', () => {
  let service: BloodRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
