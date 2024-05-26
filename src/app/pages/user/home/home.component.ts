import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, ProductCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  totalRecords: number = 0;
  limit: number = 10;
  constructor(
    private productService: ProductService,
    private navigate: Router
  ) {}
  ngOnInit(): void {
    this.loadProducts(0, this.limit);
  }
  loadProducts(page: number, limit: number) {
    this.productService.renderProducts().subscribe({
      next: (res: any) => {
        this.products = res.data
        this.totalRecords = res.results;
        console.log(res);
      },
      error: (err: any) => this.navigate.navigate(['/**'])
    })
  }
}
