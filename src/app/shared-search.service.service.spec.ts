import { TestBed } from '@angular/core/testing';

import { SharedSearchService } from './shared-search.service.service';

describe('SharedSearchServiceService', () => {
  let service: SharedSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
