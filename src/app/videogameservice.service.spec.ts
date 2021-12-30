import { TestBed } from '@angular/core/testing';

import { VideogameserviceService } from './videogameservice.service';

describe('VideogameserviceService', () => {
  let service: VideogameserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideogameserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
