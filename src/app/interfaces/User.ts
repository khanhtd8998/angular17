export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    avatar?: string;
    address?: string;
    phoneNumber?: string;
    role?: string
}

export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string
}

export interface LoginUserRequest {
    email: string;
    password: string
}