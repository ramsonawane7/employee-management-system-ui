import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartmentService } from '../../../core/services/department.service';
import { DesignationService } from '../../../core/services/designation.service';
import { DatetimeWidgetComponent } from '../../../shared/components/datetime-widget/datetime-widget.component';

interface Employee {
  empId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  hireDate?: string;
  deptId?: number | null;
  desigId?: number | null;
  salary?: number;
}
interface Department {
  deptId: number;
  deptName: string;
}
interface Designation {
  desigId: number;
  desigName: string;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatetimeWidgetComponent],
  providers: [EmployeeService, DepartmentService, DesignationService],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];
  designations: Designation[] = [];
  modalOpen = false;
  deleteConfirmOpen = false;
  isEdit = false;
  currentEmployee: Employee = {};
  deleteTarget: Employee | null = null;
  alertMsg = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(
    private empService: EmployeeService,
    private deptService: DepartmentService,
    private designationService: DesignationService
  ) {}
  ngOnInit() {
    this.loadEmployees();
    this.loadDepartments();
    this.loadDesignations();
  }
  loadEmployees() {
    this.empService.getAll().subscribe({
      next: (data: any) => { this.employees = data; },
      error: () => { this.alertMsg = 'Failed to load employees.'; this.alertType = 'danger'; }
    });
  }
  loadDepartments() {
    this.deptService.getAll().subscribe({
      next: (data: Department[]) => { this.departments = data; },
      error: () => { this.alertMsg = 'Failed to load departments.'; this.alertType = 'danger'; }
    });
  }
  loadDesignations() {
    this.designationService.getAll().subscribe({
      next: (data: Designation[]) => { this.designations = data; },
      error: () => { this.alertMsg = 'Failed to load designations.'; this.alertType = 'danger'; }
    });
  }
  openAdd() {
    this.isEdit = false;
    this.currentEmployee = {};
    this.modalOpen = true;
    this.alertMsg = '';
    // Load dropdowns for safety
    this.loadDepartments();
    this.loadDesignations();
  }
  openEdit(emp: Employee) {
    this.isEdit = true;
    this.currentEmployee = { ...emp };
    this.modalOpen = true;
    this.alertMsg = '';
    this.loadDepartments();
    this.loadDesignations();
  }
  saveEmployee() {
    if (this.isEdit && (!this.currentEmployee.empId || isNaN(+this.currentEmployee.empId))) {
      this.alertMsg = 'Employee ID is missing or invalid for update.';
      this.alertType = 'danger';
      return;
    }
    const op = this.isEdit ? this.empService.update(this.currentEmployee) : this.empService.create(this.currentEmployee);
    op.subscribe({
      next: () => {
        this.alertMsg = this.isEdit ? 'Employee updated.' : 'Employee added.';
        this.alertType = 'success';
        this.modalOpen = false;
        this.loadEmployees();
      },
      error: () => {
        this.alertMsg = 'Save failed.';
        this.alertType = 'danger';
      }
    });
  }
  confirmDelete(emp: Employee) {
    this.deleteTarget = emp;
    this.deleteConfirmOpen = true;
  }
  deleteEmployee() {
    if (!this.deleteTarget) return;
    this.empService.delete(this.deleteTarget.empId as number).subscribe({
      next: () => {
        this.alertMsg = 'Employee deleted.';
        this.alertType = 'success';
        this.loadEmployees();
        this.deleteConfirmOpen = false;
        this.deleteTarget = null;
      },
      error: () => {
        this.alertMsg = 'Delete failed.';
        this.alertType = 'danger';
      }
    });
  }
  resetForm() {
    this.modalOpen = false;
    this.deleteConfirmOpen = false;
    this.currentEmployee = {};
    this.deleteTarget = null;
    this.alertMsg = '';
  }
  getDeptNameById(id: number | null | undefined) {
    return this.departments.find(d => d.deptId === id)?.deptName ?? id ?? '-';
  }
  getDesigNameById(id: number | null | undefined) {
    return this.designations.find(d => d.desigId === id)?.desigName ?? id ?? '-';
  }
}
