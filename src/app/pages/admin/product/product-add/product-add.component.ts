import { Component } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  product!: Product
  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }
  handleAddProduct(form: NgForm) {
    if(form.invalid){
      alert("Vui lòng nhập đầy đủ thông tin")
    }
    if(form.valid){
      this.productService.addProduct(form.value).subscribe(
        {
          next: () => {
            form.reset()
            alert("Success")
            this.router.navigate(['/admin/products/list/'])
          },
          error: (err: any) => console.log(err.message)
        }
      )
    }

  }
}
