import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private baseUrl = `${environment.apiBaseUrl1}/departments`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<any[]>(this.baseUrl); }
  count() { return this.http.get(`${this.baseUrl}/count`, { responseType: 'text' }).pipe(map((res: string) => {
    const n = Number(res);
    if (!isNaN(n)) return n;
    try {
      const obj = JSON.parse(res);
      const v = typeof obj === 'number' ? obj : (obj?.count ?? obj?.total ?? obj?.value);
      const parsed = Number(v);
      if (!isNaN(parsed)) return parsed;
    } catch { /* fall through */ }
    const match = res.match(/-?\d+/);
    if (match) {
      const m = Number(match[0]);
      return isNaN(m) ? 0 : m;
    }
    return 0;
  })); }
  create(dept: any) { return this.http.post(this.baseUrl, dept); }
  update(dept: any) {
    return this.http.put(`${this.baseUrl}/${dept.deptId}`, { deptName: dept.deptName });
  }
  delete(id: number) {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}
}
