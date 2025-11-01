import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt_token');
  
  console.log('AuthInterceptor called:', {
    url: req.url,
    hasToken: !!token,
    token: token ? token.substring(0, 20) + '...' : 'null'
  });

  // Skip attaching token for login/auth endpoints (port 9090)
  if (req.url.includes('/auth/login') || req.url.includes(':9090')) {
    console.log('Skipping token for login/9090 endpoint');
    return next(req);
  }

  // Attach token for EMS API calls (port 8585)
  if (token && req.url.includes(':8585')) {
    console.log('Adding token to 8585 request');
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }

  console.log('No token attached - conditions not met');
  return next(req);
};
