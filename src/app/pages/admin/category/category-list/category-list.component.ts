import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/Category';
import swal from 'sweetalert';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgxPaginationModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: Category[] = [];
  p: number = 1;
  categoryService = inject(CategoryService)
  constructor() {
    this.categoryService.renderCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data
        console.log(this.categories)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  handleDelCategory(id: string | undefined) {
    swal({
      title: "Bạn muốn xóa danh mục này?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục danh mục này!",
      icon: "warning",
      buttons: ["Cancel", "OK"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.categoryService.removeCategory(id).subscribe({
            next: () => {
              this.categories = this.categories.filter((item: Category) => item._id != id)
              swal("Xóa danh mục thành công", {
                icon: "success",
                buttons: [''],
                timer: 2000
              });
            },
            error: (err: any) => {
              swal({
                title: `${err.error.message}`,
                icon: "warning",
                dangerMode: true,
              })
            }
          })
        } else {
          swal({
            icon: "success",
            text: "Every thing is Good",
            buttons: [''],
            timer: 2000
          });
        }
      });
  }
}
