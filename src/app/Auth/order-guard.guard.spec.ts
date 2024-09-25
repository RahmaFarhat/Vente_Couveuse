import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { orderGuardGuard } from './order-guard.guard';

describe('orderGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => orderGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
