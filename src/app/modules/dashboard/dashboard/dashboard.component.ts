import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartmentService } from '../../../core/services/department.service';
import { DesignationService } from '../../../core/services/designation.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  employeeCount = 0;
  departmentCount = 0;
  designationCount = 0;
  loading = false;
  error = '';

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchCounts();
  }

  fetchCounts() {
    this.loading = true;
    this.error = '';
    // Fetch in parallel
    // Force a direct call to ensure /employees/count is hit
    const employeesCountUrl = `${environment.apiBaseUrl}/employees/count`;
    this.http.get(employeesCountUrl, { responseType: 'text' }).subscribe({
      next: (res) => {
        try { console.debug('[Dashboard] employees/count raw:', res); } catch {}
        const n = Number(res);
        this.employeeCount = isNaN(n) ? 0 : n;
      },
      error: () => { this.error = 'Failed to load counts.'; }
    });
    this.departmentService.count().subscribe({
      next: (c) => { this.departmentCount = c as number; },
      error: () => { this.error = 'Failed to load counts.'; }
    });
    this.designationService.count().subscribe({
      next: (c) => { this.designationCount = c as number; },
      error: () => { this.error = 'Failed to load counts.'; }
    });
    this.loading = false;
  }
}
