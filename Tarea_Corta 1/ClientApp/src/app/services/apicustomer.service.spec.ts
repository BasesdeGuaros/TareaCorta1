import { TestBed } from '@angular/core/testing';

import { ApicustomerService } from './apicustomer.service';

describe('ApicustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApicustomerService = TestBed.get(ApicustomerService);
    expect(service).toBeTruthy();
  });
});
