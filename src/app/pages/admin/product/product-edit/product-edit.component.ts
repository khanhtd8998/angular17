import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';

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
    private navigate: Router
  ){
    this.route.paramMap.subscribe((params: any) => {
      const id = String(params.get('id'));
      this.productService.renderProduct(id).subscribe(
        (res: any) => {
          // this.product = res.data;
          this.product = res;
          console.log(this.product);
          console.log(res);
        }
      )
    })
  }
  handleEditProduct (form: NgForm) {
    console.log(form.value);
    this.productService.editProduct(this.product._id,form.value).subscribe(
      {
        next: (data: any) => {
          alert("Success!");
          form.reset()
          this.navigate.navigate(['/admin/products/list'])
        },
        error: (err: any) => console.log(err.message)
      }
    )
  }
}
