import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, ProductCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.renderProducts().subscribe((res: any) => {
      // this.products = res.data
      this.products = res
      console.log(this.products);
    })
  }
}
