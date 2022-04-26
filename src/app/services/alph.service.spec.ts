import { TestBed } from '@angular/core/testing';

import { AlphService } from './alph.service';

describe('AlphService', () => {
  let service: AlphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
