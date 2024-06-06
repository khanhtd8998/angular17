import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BidService } from '../../../services/bid/bid.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product!: Product | undefined;
  user: any = null
  productId!: string
  formBid: FormGroup = new FormGroup({
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
  });
  ngOnInit(): void {
    this.scrollService.scrollToTop()
    this.loadProduct()
    const data = localStorage.getItem('user')
    if(data){
      this.user = JSON.parse(data)
    }
  }
  constructor(
    private scrollService: ScrollPositionService,
    private productService: ProductService,
    private bidService: BidService,
    private route: ActivatedRoute,
    private navigate: Router
  ) {}
  loadProduct() {
    this.route.paramMap.subscribe((params: any) => {
      const id = String(params.get('id'));
      this.productId = id
      this.productService.renderProduct(id).subscribe({
        next: (res: any) => {
          this.product = res.data;
          console.log(this.product)
        },
        error: (err: any) => this.navigate.navigate(['../notfound'])
      })
    })
  }
  handleBid() {
    if(!this.product) return
    if(!this.user) {
      swal({
        title: `Bạn cần đăng nhập để đấu giá`,
        icon: "warning",
        dangerMode: true,
      })
      return
    }
    if(this.formBid.valid) {
      this.bidService.createBid({
        product: this.productId,
        user: this.user._id,
        price: this.formBid.get('price')?.value,
        bids: this.product.bids.map((bid) => bid._id)
      }).subscribe({
        next: (res: any) => {
          this.loadProduct()
          swal({
            title: "Thành công",
            text: "Đấu giá thành công",
            icon: "success",
            buttons: [""],
            timer: 2000,
          })
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }
}
