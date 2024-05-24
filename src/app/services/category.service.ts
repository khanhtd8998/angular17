import { Injectable, inject } from '@angular/core';
import { Category } from '../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API = "https://nodejs-project-8998.vercel.app/categories"
  http = inject(HttpClient)
  renderCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API)
  }
  constructor() { }
}
