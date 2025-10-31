import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DesignationService {
  private baseUrl = `${environment.apiBaseUrl}/designations`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<any[]>(this.baseUrl); }
  create(desig: any) { return this.http.post(this.baseUrl, desig); }
  update(desig: any) {
    return this.http.put(`${this.baseUrl}/${desig.desigId}`, { desigName: desig.desigName });
  }
  delete(id: number) { return this.http.delete(`${this.baseUrl}/${id}`); }
}
