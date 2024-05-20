import { Component, inject } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';
@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  toastr = inject(ToastrService)
  product!: Product
  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }
  handleAddProduct(form: NgForm) {
    if (form.valid) {
      this.productService.addProduct(form.value).subscribe(
        {
          next: () => {
            form.reset()
            setTimeout(() => {
              this.router.navigate(['/admin/products/list/'])
            }, 1000)
            swal({
              title: "Thành công",
              text: "Sản phẩm đã được thêm mới",
              icon: "success",
              buttons: [""],
              timer: 2000,
            })
          },
          error: (err: any) => this.toastr.error("Thêm sản phẩm thất bại", err.message)
        }
      )
    }
  }
}
