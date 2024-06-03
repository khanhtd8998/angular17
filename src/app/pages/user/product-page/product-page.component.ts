import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/Product';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  products!: Product[]
  ngOnInit(): void {
    this.scrollService.scrollToTop()
  }
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private scrollService: ScrollPositionService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      const keyword = String(params.get('search'));
      this.productService.searchProduct(keyword).subscribe({
        next: (res: any) => {
          this.products = res.data;
          console.log(this.products);
        },
        error: (err: any) => console.log(err)
      })
    })
  }
}
