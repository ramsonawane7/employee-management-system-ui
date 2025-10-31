import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private baseUrl = `${environment.apiBaseUrl}/departments`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<any[]>(this.baseUrl); }
  create(dept: any) { return this.http.post(this.baseUrl, dept); }
  update(dept: any) {
    return this.http.put(`${this.baseUrl}/${dept.deptId}`, { deptName: dept.deptName });
  }
  delete(id: number) { return this.http.delete(`${this.baseUrl}/${id}`); }
}
