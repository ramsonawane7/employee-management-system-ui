import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginErrorResponse } from '../../../core/services/auth.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.message = ''; // Clear previous messages
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Login successful - token is already stored in AuthService
        if (response.token) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error: LoginErrorResponse) => {
        // Handle 401 Unauthorized error
        this.message = error.error || 'Invalid Credentials!';
      }
    });
  }
}
