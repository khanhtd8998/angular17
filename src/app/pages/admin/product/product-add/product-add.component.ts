import { Component, inject } from '@angular/core';
import {  ProductRequest } from '../../../../interfaces/product';
import { CommonModule, NgFor } from '@angular/common';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/category';
@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  categories: Category[] = []
  product: ProductRequest = {
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    hide: false,
    rating: 0,
    stock: 0,
    discountPercentage: 0,
    brand: ''
  };
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
    console.log(form.value)
  }
}
