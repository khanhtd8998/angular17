import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductRequest } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // API = "https://nodejs-project-8998.vercel.app/products"
  API = "http://localhost:8000/products"
  http = inject(HttpClient)
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  renderProducts(){
    return this.http.get<Product[]>(`${this.API}`)
  }

  renderProduct(id: string | undefined){
    return this.http.get<Product>(this.API + "/" + id)
  }

  addProduct(product: ProductRequest){
    return this.http.post<ProductRequest>(this.API, product, { headers: this.getAuthHeaders() })
  }

  deleteProduct(id: string | undefined){
    return this.http.delete<Product>(this.API + "/" + id, { headers: this.getAuthHeaders() })
  }

  editProduct(id: string | undefined, product: ProductRequest){
    return this.http.put<ProductRequest>(this.API + "/" +  id, product, { headers: this.getAuthHeaders() })
  }

  searchProduct(text: string | undefined): Observable<Product> {
    return this.http.get<Product>(this.API + "?name=" + text)
  }
}
