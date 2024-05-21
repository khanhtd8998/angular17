import { Component, Input, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, ToastModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input()
  product!: Product;
  toastr = inject(ToastrService)
  handleAddToCart() {
      this.toastr.success('Add to cart successfully', '')
  }
}
