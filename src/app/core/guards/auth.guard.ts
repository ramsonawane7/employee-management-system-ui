import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  // Check for JWT token in localStorage
  const token = localStorage.getItem('jwt_token');
  const isLoggedIn = token && localStorage.getItem('login') === 'true';
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};