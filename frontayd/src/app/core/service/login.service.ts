import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginResponse } from '../interfaces/login.interface'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = 'http://localhost:5000/api/authenticator/check';

  constructor(private http: HttpClient) {}

  login(identifier: string, password: string): Observable<LoginResponse> {
    const body = { identifier, password };
    return this.http.post<LoginResponse>(this.apiUrl, body);
  }
}
