import { Component, inject } from '@angular/core';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  scrollService = inject(ScrollPositionService)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.scrollService.scrollToTop()
  }
}
