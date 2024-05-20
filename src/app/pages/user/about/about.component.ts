import { Component, inject } from '@angular/core';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  scrollServie = inject(ScrollPositionService)
  ngOnInit(): void {
    this.scrollServie.scrollToTop()
  }
}
