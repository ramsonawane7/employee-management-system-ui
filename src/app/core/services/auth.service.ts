import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface LoginResponse {
  token: string;
}

export interface LoginErrorResponse {
  error: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password }).pipe(
      map((response) => {
        // Store token in localStorage
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem('login', 'true');
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized with error message
        if (error.status === 401) {
          const errorResponse: LoginErrorResponse = error.error || { error: 'Invalid Credentials!' };
          return throwError(() => errorResponse);
        }
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('login');
  }
}
