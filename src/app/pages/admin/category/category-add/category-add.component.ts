import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent {
  categoryService = inject(CategoryService)
  router = inject(Router)
  formCatProduct: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    slug: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    hide: new FormControl(false),
  });

  handleAddCategory() {
    if (this.formCatProduct.valid) {
      this.categoryService.addCategory(this.formCatProduct.value).subscribe({
        next: () => {
          this.formCatProduct.reset()
          setTimeout(() => {
            this.router.navigate(['/admin/categories/list/'])
          }, 1000)
          swal({
            title: "Thành công",
            text: "Danh mục đã được thêm mới",
            icon: "success",
            buttons: [""],
            timer: 2000,
          })
        },
        error: (err: any) => {
          swal({
            title: `${err.error.message}`,
            icon: "warning",
            dangerMode: true,
          })
        }
      })
    }
  }
}
