import { Component, Inject, inject } from '@angular/core';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';
import { RegisterUserRequest } from '../../../interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  scrollService = inject(ScrollPositionService)
  userService = inject(UserService)
  router = inject(Router)
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })
  ngOnInit(): void {
    this.scrollService.scrollToTop()
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      swal({
        title: "Đăng ký tài khoản thất bại",
        icon: "warning",
        dangerMode: true,
      })
    }
    const user: RegisterUserRequest = this.registerForm.value as RegisterUserRequest
    this.userService.regíterUsers(user).subscribe({
      next: () => {
        this.registerForm.reset()
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1000)
        swal({
          title: "Thành công",
          text: "Đăng ký tài khoản thành công",
          icon: "success",
          buttons: [""],
          timer: 2000,
        })
      },
      error: (err: any) => {
        if (err.status == 404) {
          swal({
            title: "Đăng ký tài khoản thất bại",
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
    console.log(this.registerForm.value);
  }
}
