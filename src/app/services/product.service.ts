import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API = "https://nodejs-project-8998.vercel.app/products"
  // API = "http://localhost:3000/products"
  // API = "http://localhost:8000/products"
  http = inject(HttpClient)
  renderProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API)
  }

  renderProduct(id: string | undefined): Observable<Product> {
    return this.http.get<Product>(this.API + "/" + id)
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API, product)
  }

  deleteProduct(id: string | undefined): Observable<Product> {
    return this.http.delete<Product>(this.API + "/" + id)
  }

  editProduct(id: string | undefined, product: Product): Observable<Product> {
    return this.http.put<Product>(this.API + "/" +  id, product)
  }

  searchProduct(text: string | undefined): Observable<Product> {
    return this.http.get<Product>(this.API + "?name=" + text)
  }
}
