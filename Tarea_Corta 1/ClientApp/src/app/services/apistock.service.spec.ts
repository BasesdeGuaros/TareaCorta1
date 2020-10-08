import { TestBed } from '@angular/core/testing';

import { ApistockService } from './apistock.service';

describe('ApistockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApistockService = TestBed.get(ApistockService);
    expect(service).toBeTruthy();
  });
});
