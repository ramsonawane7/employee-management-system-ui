import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeListComponent } from './modules/employee/employee-list/employee-list.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { DepartmentListComponent } from './modules/department/department-list/department-list.component';
import { DesignationListComponent } from './modules/designation/designation-list/designation-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'departments', component: DepartmentListComponent, canActivate: [authGuard] },
  { path: 'designations', component: DesignationListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
