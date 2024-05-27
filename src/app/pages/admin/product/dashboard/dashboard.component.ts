import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ToastModule, ButtonModule ,RippleModule, PaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor() {}
}
