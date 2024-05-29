import { Component, inject } from '@angular/core';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { LoginUserRequest } from '../../../interfaces/User';

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
    if (this.loginForm.invalid) {
      swal({
        title: "Đăng ký tài khoản thất bại",
        icon: "warning",
        dangerMode: true,
      })
    }
    const user: LoginUserRequest = this.loginForm.value as LoginUserRequest
    this.userService.loginUser(user).subscribe({
      next: () => {
        this.loginForm.reset()
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard'])
        }, 1000)
        swal({
          title: "Thành công",
          text: "Đăng nhập thành công",
          icon: "success",
          buttons: [""],
          timer: 2000,
        })
      },
      error: (err: any) => {
        if (err.status == 400) {
          swal({
            title: `Lỗi ${err.status}`,
            text: `${err.error.message}`,
            icon: "warning",
            dangerMode: true,
          })
        } else {
          swal({
            title: "Lỗi server",
            icon: "warning",
            dangerMode: true,
          })
        }
      }
    })
  }
}
