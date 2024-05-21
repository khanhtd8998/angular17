import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  scrollService = inject(ScrollPositionService)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.scrollService.scrollToTop()
  }
}
