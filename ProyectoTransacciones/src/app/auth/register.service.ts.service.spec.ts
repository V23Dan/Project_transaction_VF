import { TestBed } from '@angular/core/testing';

import { RegisterServiceTsService } from './register.service.ts.service';

describe('RegisterServiceTsService', () => {
  let service: RegisterServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
