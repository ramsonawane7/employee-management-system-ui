import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, AdminLayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee-management-ui';
  constructor(private router: Router, private authService: AuthService) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  get showNavbar() {
    return this.router.url !== '/login';
  }
}
