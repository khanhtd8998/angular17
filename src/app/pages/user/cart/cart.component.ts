import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  scrollService = inject(ScrollPositionService)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.scrollService.scrollToTop()
  }
}
