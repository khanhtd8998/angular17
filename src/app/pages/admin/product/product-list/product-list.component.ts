import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../../components/product-card/product-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import swal from 'sweetalert';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent, NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  productDetail!: Product
  newProducts!: Product[];
  keyword: string = "";
  p: number = 1

  constructor(
    private productService: ProductService,
  ) { }
  ngOnInit(): void {
    this.loadProducts()
  }
  loadProducts(): void {
    this.productService.renderProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err) => {
        if (err.status == 400) {
          swal({
            title: "Danh sách sản phẩm đang trống",
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
    })
  }
  showProductDetail(id: string | undefined): void {
    const showDetail = document.querySelector('.show-product-detail')
    showDetail?.classList.toggle('show-detail')
    this.productService.renderProduct(id).subscribe(
      (res: any) => {
        this.productDetail = res.data;
      }
    )
  }

  closeProductDetail() {
    const showDetail = document.querySelector('.show-product-detail')
    showDetail?.classList.remove('show-detail')
  }

  handleDelProduct(id: string | undefined) {
    swal({
      title: "Bạn muốn xóa sản phẩm này?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục sản phẩm này!",
      icon: "warning",
      buttons: ["Cancel", "OK"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              this.products = this.products.filter((item: Product) => item._id != id)
              swal("Xóa sản phẩm thành công", {
                icon: "success",
                buttons: [''],
                timer: 2000
              });
            },
            error: () => {
              swal("Xóa sản phẩm thất bại", {
                icon: "warning",
                buttons: [''],
                timer: 2000
              });
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
  handleSearchKeyword() {
    this.products = this.products?.filter((p: Product) => p.name.toLowerCase().includes(this.keyword.toLowerCase()));
  }
}
