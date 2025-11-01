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
    return this.http.get(`${this.baseUrl}/count`, { responseType: 'text' }).pipe(
      map((res: string) => {
        // debug: log raw response
        try { console.debug('[EmployeeService.count] raw:', res); } catch {}
        const asNumber = Number(res);
        if (!isNaN(asNumber)) return asNumber;
        try {
          const obj = JSON.parse(res);
          const v = typeof obj === 'number' ? obj : (obj?.count ?? obj?.total ?? obj?.value);
          const n = Number(v);
          try { console.debug('[EmployeeService.count] parsed JSON:', obj, 'value:', v, 'num:', n); } catch {}
          return isNaN(n) ? 0 : n;
        } catch {
          const match = res.match(/-?\d+/);
          if (match) {
            const n = Number(match[0]);
            try { console.debug('[EmployeeService.count] extracted digits:', match[0], 'num:', n); } catch {}
            return isNaN(n) ? 0 : n;
          }
          return 0;
        }
      })
    );
  }
  create(emp: any) { return this.http.post(this.baseUrl, emp); }
  delete(id: number) { return this.http.delete(`${this.baseUrl}/${id}`); }
  update(emp: any) {
    return this.http.put(`${this.baseUrl}/${emp.empId}`, emp);
  }
  
}
