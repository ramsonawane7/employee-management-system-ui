import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = `${environment.apiBaseUrl}/employees`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> { return this.http.get<any[]>(this.baseUrl); }
  create(emp: any) { return this.http.post(this.baseUrl, emp); }
  delete(id: number) { return this.http.delete(`${this.baseUrl}/${id}`); }
  update(emp: any) {
    return this.http.put(`${this.baseUrl}/${emp.empId}`, emp);
  }
  
}
