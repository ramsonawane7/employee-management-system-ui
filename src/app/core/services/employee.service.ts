import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = `${environment.apiBaseUrl1}/employees`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> { return this.http.get<any[]>(this.baseUrl); }
  getPaginated(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }
  search(keyword: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`);
  }
  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
  create(emp: any) { return this.http.post(this.baseUrl, emp); }
  delete(id: number) { return this.http.delete(`${this.baseUrl}/${id}`); }
  update(emp: any) {
    return this.http.put(`${this.baseUrl}/${emp.empId}`, emp);
  }
  
}
