import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { ProductRequest } from '../../../../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/Category';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  product!: ProductRequest  
  categories: Category[] = []
  formEditProduct = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    hide: new FormControl(false),
    rating: new FormControl(0, Validators.min(0)),
    stock: new FormControl(0, Validators.min(0)),
    discountPercentage: new FormControl(0),
  })
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private navigate: Router
  ){
    this.getAllCategory(),
      this.getProductDetail()
  }
  getAllCategory() {
    this.categoryService.renderCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data
      }
    })
  }
  getProductDetail() {
    this.route.paramMap.subscribe((params: any) => {
      const id = String(params.get('id'));
      this.productService.renderProduct(id).subscribe(
        (res: any) => {
          // this.product = res.data;
          const productData = res.data;
          this.product = {
            ...productData,
            category: productData.category._id,
          }
          console.log(this.product)
          this.formEditProduct.patchValue(this.product)
        }
      )
    })
  }
  handleEditProduct () {
    const product: ProductRequest = this.formEditProduct.value as ProductRequest
    this.productService.editProduct(this.product._id, product).subscribe({
      next: () => {
        this.formEditProduct.reset()
        setTimeout(() => {
          this.navigate.navigate(['/admin/products/list/'])
        }, 1000)
        swal({
          title: "Thành công",
          text: "Sản phẩm đã được cập nhật",
          icon: "success",
          buttons: ["OK"],
          timer: 2000,
        })
      },
      error: (err: any) => swal({
        title: "Cập nhật thất bại",
        icon: "warning",
        dangerMode: true,
      })
    }
    )
    console.log(this.formEditProduct.value)
  }
}
