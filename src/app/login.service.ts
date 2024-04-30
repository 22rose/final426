import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/register', { username, password });
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/login', { username, password });
  }
}