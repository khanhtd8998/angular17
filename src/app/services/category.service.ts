import { Injectable, inject } from '@angular/core';
import { Category } from '../interfaces/Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API = "https://nodejs-project-8998.vercel.app/categories"
  // API = "http://localhost:8000/categories"
  http = inject(HttpClient)
  constructor() {}
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  renderCategories() {
    return this.http.get<Category[]>(this.API)
  }
  renderCategory(id: string | undefined) {
    return this.http.get<Category>(`${this.API}/${id}`)
  }
  removeCategory(id: string | undefined) {
    return this.http.delete<Category>(`${this.API}/${id}`, { headers: this.getAuthHeaders() })
  }

  addCategory(data: Category): Observable<Category[]> {
    return this.http.post<Category[]>(this.API, data, { headers: this.getAuthHeaders() })
  }
}
