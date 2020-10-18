import { TestBed } from '@angular/core/testing';

import { ApiproductsService } from './apiproducts.service';

describe('ApiproductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiproductsService = TestBed.get(ApiproductsService);
    expect(service).toBeTruthy();
  });
});
