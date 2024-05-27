import { Component } from '@angular/core';
import { ProductRequest } from '../../../../interfaces/product';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/category';
@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  categories: Category[] = []
  formAddProduct = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    hide: new FormControl(false),
    rating: new FormControl(0),
    stock: new FormControl(0),
    discountPercentage: new FormControl(0),
  })
  constructor(
    private productService: ProductService,
    private categoryServie: CategoryService,
    private router: Router,
  ) {
    this.categoryServie.renderCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data
        console.log(this.categories)
      }
    })
  }
  handleAddProduct() {
    if (this.formAddProduct.valid) {
      const product: ProductRequest = this.formAddProduct.value as ProductRequest
      this.productService.addProduct(product).subscribe(
        {
          next: () => {
            this.formAddProduct.reset()
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
          error: (err: any) => {
            if (err.status == 400) {
              swal({
                title: "Thêm sản phẩm thất bại",
                icon: "warning",
                dangerMode: true,
              })
            } else {
              swal({
                title: "Lỗi server",
                icon: "warning",
                dangerMode: true,
              })
            }
          }
        }
      )
    }
  }
}
