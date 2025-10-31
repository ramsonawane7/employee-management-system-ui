import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee-management-ui';
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }
  get showNavbar() {
    return this.router.url !== '/login';
  }
}
