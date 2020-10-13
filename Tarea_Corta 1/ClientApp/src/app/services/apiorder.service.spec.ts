import { TestBed } from '@angular/core/testing';

import { ApiorderService } from './apiorder.service';

describe('ApiorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiorderService = TestBed.get(ApiorderService);
    expect(service).toBeTruthy();
  });
});
