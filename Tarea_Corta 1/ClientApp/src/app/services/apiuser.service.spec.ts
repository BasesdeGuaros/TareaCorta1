import { TestBed } from '@angular/core/testing';

import { ApiuserService } from './apiuser.service';

describe('ApiuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiuserService = TestBed.get(ApiuserService);
    expect(service).toBeTruthy();
  });
});
