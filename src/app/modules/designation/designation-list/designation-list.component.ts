import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DesignationService } from '../../../core/services/designation.service';

interface Designation {
  desigId?: number;
  desigName?: string;
}

@Component({
  selector: 'app-designation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DesignationService],
  templateUrl: './designation-list.component.html'
})
export class DesignationListComponent implements OnInit {
  designations: Designation[] = [];
  modalOpen = false;
  deleteConfirmOpen = false;
  isEdit = false;
  currentDesignation: Designation = {};
  deleteTarget: Designation | null = null;
  alertMsg = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private designationService: DesignationService) {}
  ngOnInit() { this.loadDesignations(); }

  loadDesignations() {
    this.designationService.getAll().subscribe({
      next: (data: any) => { this.designations = data; },
      error: () => { this.alertMsg = 'Failed to load designations.'; this.alertType = 'danger'; }
    });
  }

  openAdd() {
    this.isEdit = false;
    this.currentDesignation = {};
    this.modalOpen = true;
    this.alertMsg = '';
  }
  openEdit(desig: Designation) {
    this.isEdit = true;
    this.currentDesignation = { ...desig };
    this.modalOpen = true;
    this.alertMsg = '';
  }
  saveDesignation() {
    const op = this.isEdit ? this.designationService.update(this.currentDesignation) : this.designationService.create(this.currentDesignation);
    op.subscribe({
      next: () => {
        this.alertMsg = this.isEdit ? 'Designation updated.' : 'Designation added.';
        this.alertType = 'success';
        this.modalOpen = false;
        this.loadDesignations();
      },
      error: () => {
        this.alertMsg = 'Save failed.';
        this.alertType = 'danger';
      }
    });
  }
  confirmDelete(desig: Designation) {
    this.deleteTarget = desig;
    this.deleteConfirmOpen = true;
  }
  deleteDesignation() {
    if (!this.deleteTarget) return;
    this.designationService.delete(this.deleteTarget.desigId as number).subscribe({
      next: () => {
        this.alertMsg = 'Designation deleted.';
        this.alertType = 'success';
        this.loadDesignations();
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
    this.currentDesignation = {};
    this.deleteTarget = null;
    this.alertMsg = '';
  }
}
