import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginUserRequest, RegisterUserRequest } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API = "https://nodejs-project-8998.vercel.app"
  http =  inject(HttpClient)
  constructor() { }

  regíterUsers(data: RegisterUserRequest) {
    return this.http.post<RegisterUserRequest>(`${this.API}/auth/register`, data)
  }

  loginUser(data: LoginUserRequest) {
    return this.http.post<LoginUserRequest>(`${this.API}/auth/login`, data)
  }
}
