import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginUserRequest, RegisterUserRequest } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // API = "https://nodejs-project-8998.vercel.app"
  API = "http://localhost:8000"

  http =  inject(HttpClient)
  constructor() { }

  registerUsers(data: RegisterUserRequest) {
    return this.http.post<RegisterUserRequest>(`${this.API}/auth/register`, data)
  }

  loginUser(data: LoginUserRequest) {
    return this.http.post<LoginUserRequest>(`${this.API}/auth/login`, data)
  }
}
