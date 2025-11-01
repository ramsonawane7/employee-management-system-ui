import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly tokenKey = 'jwt_token';

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get token from localStorage
    const token = localStorage.getItem(this.tokenKey);

    // Clone the request and add the Authorization header if token exists
    // Skip adding token for login request to avoid circular issues
    if (token && !request.url.includes('/auth/login')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Handle the request and catch 401 errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // If we get a 401 Unauthorized, clear token and redirect to login
        if (error.status === 401 && !request.url.includes('/auth/login')) {
          localStorage.removeItem(this.tokenKey);
          localStorage.removeItem('login');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

