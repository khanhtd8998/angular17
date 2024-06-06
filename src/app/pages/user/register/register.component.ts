import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { RegisterUserRequest } from '../../../interfaces/User';
import { ScrollPositionService } from '../../../services/scroll/scroll-position.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  scrollService = inject(ScrollPositionService)
  userService = inject(UserService)
  router = inject(Router)
  registerForm: FormGroup
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  constructor() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
    this.scrollService.scrollToTop()
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }
    if(this.registerForm.value.password != this.registerForm.value.confirmPass){
      swal({
        title: `Mật khẩu nhập lại không đúng`,
        icon: "warning",
        dangerMode: true,
      })
      return
    }
    const user: RegisterUserRequest = this.registerForm.value as RegisterUserRequest
    this.userService.registerUsers(user).subscribe({
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
        swal({
          title: `${err.error.message}`,
          icon: "warning",
          dangerMode: true,
        })
      }
    })
  }
}
