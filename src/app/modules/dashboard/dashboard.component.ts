import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { DesignationService } from '../../core/services/designation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  providers: [EmployeeService, DepartmentService, DesignationService],
  template: `
    <div class="mb-5 p-4 card-modern d-flex align-items-center justify-content-between">
      <div>
        <h1 class="heading-dark mb-2"><i class="bi bi-diagram-3-fill me-3"></i>Welcome to Employee Management System</h1>
        <div class="fs-5 text-secondary fw-light">Empower your organization with effortless administration.</div>
      </div>
    </div>

    <div class="row g-4 mb-5 text-center">
      <div class="col-lg-4 col-md-6">
        <div class="card-modern p-3 mb-2 d-flex flex-column align-items-center">
          <div class="mb-2 display-3 text-main"><i class="bi bi-people-fill"></i></div>
          <div class="fs-6 text-secondary">Employees</div>
          <div class="fw-semibold fs-1 text-main lh-1">
            <span *ngIf="employeeCount !== null">{{ employeeCount }}</span>
            <span *ngIf="employeeCount === null" class="spinner-border spinner-border-sm"></span>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card-modern p-3 mb-2 d-flex flex-column align-items-center">
          <div class="mb-2 display-3 text-main"><i class="bi bi-building"></i></div>
          <div class="fs-6 text-secondary">Departments</div>
          <div class="fw-semibold fs-1 text-main lh-1">
            <span *ngIf="departmentCount !== null">{{ departmentCount }}</span>
            <span *ngIf="departmentCount === null" class="spinner-border spinner-border-sm"></span>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card-modern p-3 mb-2 d-flex flex-column align-items-center">
          <div class="mb-2 display-3 text-main"><i class="bi bi-award"></i></div>
          <div class="fs-6 text-secondary">Designations</div>
          <div class="fw-semibold fs-1 text-main lh-1">
            <span *ngIf="designationCount !== null">{{ designationCount }}</span>
            <span *ngIf="designationCount === null" class="spinner-border spinner-border-sm"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 justify-content-center mb-5 text-center animate__animated animate__fadeInUp">
      <div class="col-md-4">
        <button class="btn-main btn-lg w-100 py-4 fs-4 rounded-4 animate__animated animate__pulse animate__delay-1s dashboard-btn"
          (click)="navigate('employees')">
          <i class="bi bi-people-fill me-2"></i>Employee Management
        </button>
      </div>
      <div class="col-md-4">
        <button class="btn-main btn-lg w-100 py-4 fs-4 rounded-4 animate__animated animate__pulse animate__delay-1s dashboard-btn"
          (click)="navigate('departments')">
          <i class="bi bi-building me-2"></i>Department Management
        </button>
      </div>
      <div class="col-md-4">
        <button class="btn-main btn-lg w-100 py-4 fs-4 rounded-4 animate__animated animate__pulse animate__delay-1s dashboard-btn"
          (click)="navigate('designations')">
          <i class="bi bi-award me-2"></i>Designation Management
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-btn {
      transition: box-shadow 0.25s, border-color 0.25s;
      box-shadow: 0 2px 8px rgba(66, 99, 142, 0.07);
    }
    .dashboard-btn:hover, .dashboard-btn:focus {
      box-shadow: 0 8px 24px 0 rgba(0,72,219,0.12);
      border-width: 4px !important;
      border-color: #0d6efd !important;
    }
  `]
})
export class DashboardComponent implements OnInit {
  employeeCount: number | null = null;
  departmentCount: number | null = null;
  designationCount: number | null = null;
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.employeeService.getAll().subscribe({ next: (data: any[]) => this.employeeCount = data?.length ?? 0, error: () => this.employeeCount = 0 });
    this.departmentService.getAll().subscribe({ next: (data: any[]) => this.departmentCount = data?.length ?? 0, error: () => this.departmentCount = 0 });
    this.designationService.getAll().subscribe({ next: (data: any[]) => this.designationCount = data?.length ?? 0, error: () => this.designationCount = 0 });
  }
  navigate(route: string) { this.router.navigate([`/${route}`]); }
}


