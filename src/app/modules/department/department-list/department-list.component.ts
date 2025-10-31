import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department.service';

interface Department {
  deptId?: number;
  deptName?: string;
}

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DepartmentService],
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  modalOpen = false;
  deleteConfirmOpen = false;
  isEdit = false;
  currentDepartment: Department = {};
  deleteTarget: Department | null = null;
  alertMsg = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private deptService: DepartmentService) {}
  ngOnInit() { this.loadDepartments(); }

  loadDepartments() {
    this.deptService.getAll().subscribe({
      next: (data: any) => { this.departments = data; },
      error: () => { this.alertMsg = 'Failed to load departments.'; this.alertType = 'danger'; }
    });
  }

  openAdd() {
    this.isEdit = false;
    this.currentDepartment = {};
    this.modalOpen = true;
    this.alertMsg = '';
  }
  openEdit(dept: Department) {
    this.isEdit = true;
    this.currentDepartment = { ...dept };
    this.modalOpen = true;
    this.alertMsg = '';
  }
  saveDepartment() {
    const op = this.isEdit ? this.deptService.update(this.currentDepartment) : this.deptService.create(this.currentDepartment);
    op.subscribe({
      next: () => {
        this.alertMsg = this.isEdit ? 'Department updated.' : 'Department added.';
        this.alertType = 'success';
        this.modalOpen = false;
        this.loadDepartments();
      },
      error: () => {
        this.alertMsg = 'Save failed.';
        this.alertType = 'danger';
      }
    });
  }
  confirmDelete(dept: Department) {
    this.deleteTarget = dept;
    this.deleteConfirmOpen = true;
  }
  deleteDepartment() {
    if (!this.deleteTarget) return;
    this.deptService.delete(this.deleteTarget.deptId as number).subscribe({
      next: () => {
        this.alertMsg = 'Department deleted.';
        this.alertType = 'success';
        this.loadDepartments();
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
    this.currentDepartment = {};
    this.deleteTarget = null;
    this.alertMsg = '';
  }
}
