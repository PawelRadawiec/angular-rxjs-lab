import { TestBed } from '@angular/core/testing';

import { BlockDataHelperService } from './block-data-helper.service';

describe('ForkJoinHelperService', () => {
  let service: BlockDataHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockDataHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
