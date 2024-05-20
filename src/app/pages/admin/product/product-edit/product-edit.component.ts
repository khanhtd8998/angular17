import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  product!: Product
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private navigate: Router,
  ){
    this.route.paramMap.subscribe((params: any) => {
      const id = String(params.get('id'));
      this.productService.renderProduct(id).subscribe(
        (res: any) => {
          // this.product = res.data;
          this.product = res;
        }
      )
    })
  }
  handleEditProduct (form: NgForm) {
    this.productService.editProduct(this.product._id,form.value).subscribe({
      next: () => {
        form.reset()
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
  }
}
