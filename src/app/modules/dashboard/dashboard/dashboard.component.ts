import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartmentService } from '../../../core/services/department.service';
import { DesignationService } from '../../../core/services/designation.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
    
    this.employeeService.count().subscribe({
      next: (c) => { 
        this.employeeCount = c;
        this.loading = false;
      },
      error: () => { 
        this.error = 'Failed to load counts.';
        this.loading = false;
      }
    });
    
    this.departmentService.count().subscribe({
      next: (c) => { this.departmentCount = c; },
      error: () => { this.error = 'Failed to load counts.'; }
    });
    
    this.designationService.count().subscribe({
      next: (c) => { this.designationCount = c; },
      error: () => { this.error = 'Failed to load counts.'; }
    });
  }
}
