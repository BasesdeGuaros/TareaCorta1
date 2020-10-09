import { TestBed } from '@angular/core/testing';

import { ApiproductsproducerService } from './apiproductsproducer.service';

describe('ApiproductsproducerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiproductsproducerService = TestBed.get(ApiproductsproducerService);
    expect(service).toBeTruthy();
  });
});
