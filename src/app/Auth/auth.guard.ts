import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../Service/user-auth.service';
import { UserService } from '../Service/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  // debugger
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);
  const userService = inject(UserService)
  const authString = userAuthService.getBasicAuthString();

  if (authString !== null) {
    const userRoles = route.data['roles'] as Array<string>;
    const hasAccess = userService.roleMatch(userRoles)
    if (hasAccess) {
      return true;
    } else {
      router.navigate(['/forbidden']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
