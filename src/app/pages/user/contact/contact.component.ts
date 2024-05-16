import { Component } from '@angular/core';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(
    private scrollService: ScrollPositionService
  ) {}
  ngOnInit(): void {
    this.scrollService.scrollToTop()
  }
}
