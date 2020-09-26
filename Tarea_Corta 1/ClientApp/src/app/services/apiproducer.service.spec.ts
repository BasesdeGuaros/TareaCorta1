import { TestBed } from '@angular/core/testing';

import { ApiproducerService } from './apiproducer.service';

describe('ApiproducerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiproducerService = TestBed.get(ApiproducerService);
    expect(service).toBeTruthy();
  });
});
