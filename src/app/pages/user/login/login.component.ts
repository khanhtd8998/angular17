import { Component, inject } from '@angular/core';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  scrollService = inject(ScrollPositionService)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.scrollService.scrollToTop()
  }
}
