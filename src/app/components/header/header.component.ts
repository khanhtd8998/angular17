import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  search: string = '';
  user: any = null
  authService = inject(AuthService)
  navigate =  inject(Router)
  ngOnInit(): void {
    const data = localStorage.getItem('user')
    if(data){
      this.user = JSON.parse(data)
    }
  }
  handleSearch(form: NgForm) {
    this.navigate.navigate([`/product-page/${this.search}`]);
  }
  logout() {
    this.authService.logout();
    this.user = null;
  }
}
