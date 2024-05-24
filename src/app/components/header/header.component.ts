import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  search: string = '';

  navigate =  inject(Router)

  handleSearch(form: NgForm) {
    this.navigate.navigate([`/product-page/${this.search}`]);
  }
}
