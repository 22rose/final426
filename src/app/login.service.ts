import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userId: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/register', { username, password });
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/login', { username, password });
  }

  logoutUser(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/logout', { username, password });
  }

  getYourId(userId: number): Observable<any> {
    // Make the API call to retrieve journal entries using the userId
    return this.http.get<any>(`http://localhost:5000/auth/user/${userId}`);
  }

  deleteUser(userId: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:5000/auth/delete/${userId}`)
  }

  updatePassword(username: string, oldPassword: string, newPassword: string): Observable<any>{
    return this.http.put<any>('http://localhost:5000/auth/update-password', {username, oldPassword, newPassword})
  }



  // getJournalEntries(): Observable<any[]> {
  //   const url = 'http://localhost:5000/api/journal-entries';
  //   return this.http.get<any[]>(url);
  // }

  getJournalEntries(userId: number): Observable<any> {
    // Make the API call to retrieve journal entries using the userId
    return this.http.get<any>(`http://localhost:5000/api/journal-entries/${userId}`);
  }


  addJournalEntry(userId: number, title: string, content: string): Observable<any> {
    return this.http.post<any>(`http://localhost:5000/api/journal-entries/${userId}`, { title, content });
  }

  getEntry(entryId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/specific-journal-entries/${entryId}`);
  }

  editEntry(entryId: number, title: string, content: string): Observable<any>{
    return this.http.put<any>(`http://localhost:5000/api/journal-entries/${entryId}`, { title, content })
  }

  deleteEntry(entryId: number): Observable<any>{
    return this.http.delete(`http://localhost:5000/api/journal-entries/${entryId}`)
  }

  
 
 
 }