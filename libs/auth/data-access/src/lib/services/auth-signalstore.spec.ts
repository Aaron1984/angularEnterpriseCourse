import { TestBed } from '@angular/core/testing';

import { AuthSignalstore } from './auth-signalstore';

describe('AuthSignalstore', () => {
  let service: AuthSignalstore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSignalstore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
