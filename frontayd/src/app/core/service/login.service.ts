import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginResponse } from '../interfaces/login.interface'
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly checkApiUrl = `${environment.API_URL}/authenticator/check`;
  private readonly validateApiUrl = `${environment.API_URL}/authenticator/validate/password`;
  private readonly validateFileUrl = `${environment.API_URL}/authenticator/validate/file`;

  constructor(private http: HttpClient) {}

  login(identifier: string, password: string): Observable<LoginResponse> {
    const body = { identifier, password };
    return this.http.post<LoginResponse>(this.checkApiUrl, body);
  }

  validateAdmin(identifier: string, second_password: string): Observable<LoginResponse> {
    const body = { identifier, second_password };
    return this.http.post<LoginResponse>(this.validateApiUrl, body);
  }

  validateFile(identifier: string, file: File): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('identifier', identifier);
    formData.append('file', file);

    return this.http.post<LoginResponse>(this.validateFileUrl, formData);
  }
}
