import { TestBed } from '@angular/core/testing';

import { ApireceiveService } from './apireceive.service';

describe('ApireceiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApireceiveService = TestBed.get(ApireceiveService);
    expect(service).toBeTruthy();
  });
});
