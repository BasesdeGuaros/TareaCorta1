import { TestBed } from '@angular/core/testing';

import { ApiorderproductsService } from './apiorderproducts.service';

describe('ApiorderproductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiorderproductsService = TestBed.get(ApiorderproductsService);
    expect(service).toBeTruthy();
  });
});
