import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../Service/user-auth.service';

export const orderGuardGuard: CanActivateFn = (route, state) => {
  const orderService = inject(UserAuthService);
  const router = inject(Router);

  if (orderService.isOrderPlaced()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
