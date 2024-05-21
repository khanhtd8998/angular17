import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';

@Component({
  selector: 'app-checkout-done',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout-done.component.html',
  styleUrl: './checkout-done.component.css'
})
export class CheckoutDoneComponent {

  scrollService = inject(ScrollPositionService)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.scrollService.scrollToTop()
  }
}
