import { Component, inject } from '@angular/core';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userService = inject(UserService)
  router = inject(Router)
  scrollService = inject(ScrollPositionService)
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })
  ngOnInit(): void {
    this.scrollService.scrollToTop()
  }

  onSubmit() {
    console.log(this.loginForm.value)
  }
}
