import { TestBed } from '@angular/core/testing';

import { HeaderOperatorsDataService } from './header-operators-data.service';

describe('HeaderOperatorsDataService', () => {
  let service: HeaderOperatorsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderOperatorsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
