import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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


//   getJournalEntries(): Observable<any[]> {
//     const url = 'http://localhost:5000/api/journal-entries';
//     return this.http.get<any[]>(url);
//   }
// getJournalEntries(userId: number): Observable<any[]> {
//   // Append userId to the URL query string
//   const url = `http://localhost:5000/api/journal-entries?userId=${userId}`;
//   return this.http.get<any[]>(url);
// }
 }