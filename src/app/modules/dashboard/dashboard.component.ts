import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { DesignationService } from '../../core/services/designation.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
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
    this.employeeService.count().subscribe({
      next: (count) => this.employeeCount = count,
      error: () => this.employeeCount = 0
    });

    this.departmentService.count().subscribe({
      next: (count) => this.departmentCount = count,
      error: () => this.departmentCount = 0
    });

    this.designationService.count().subscribe({
      next: (count) => this.designationCount = count,
      error: () => this.designationCount = 0
    });
  }

  navigate(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
