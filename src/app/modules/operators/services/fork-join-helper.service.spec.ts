import { TestBed } from '@angular/core/testing';

import { ForkJoinHelperService } from './fork-join-helper.service';

describe('ForkJoinHelperService', () => {
  let service: ForkJoinHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForkJoinHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
