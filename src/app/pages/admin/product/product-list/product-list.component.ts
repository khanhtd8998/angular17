import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  newProducts!: Product[];
  keyword: string = ""
  constructor(
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.loadData();
    // this.newProducts = this.products
  }
  loadData(): void {
    this.productService.renderProducts().subscribe((res: any) => {
      // this.products = res.data;
      this.products = res;
    })
  }

  handleDelProduct(id: string | undefined){
    if(confirm("Are you sure you want to delete this product")){
      this.productService.deleteProduct(id).subscribe((data: any) => {
        this.loadData();
      })
    }
  }
  handleSearchKeyword(){
    this.newProducts = this.products
    this.products = this.newProducts?.filter((p: Product) => p.name.toLowerCase().includes(this.keyword.toLowerCase()));
  }
}
