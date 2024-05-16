import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product!: Product | undefined;
  ngOnInit(): void {
    this.scrollService.scrollToTop()
    
  }
  constructor(
    private scrollService: ScrollPositionService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      const id = String(params.get('id'));
      this.productService.renderProduct(id).subscribe(
        (res: any) => {
          console.log(res);
          // this.product = res.data;
          this.product = res;
        }
      )
    })
  }
}
