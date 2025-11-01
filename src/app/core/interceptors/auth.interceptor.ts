import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt_token');

  // Skip attaching token for login/auth endpoints (port 9090)
  if (req.url.includes('/auth/login') || req.url.includes(':9090')) {
    return next(req);
  }

  // Attach token for EMS API calls (port 8585)
  if (token && req.url.includes(':8585')) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }

  return next(req);
};
