import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountsByCuiResponse, Transactions, AccountResponse } from '../../interfaces/account';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = `${environment.API_URL}/client`;
  private updaterl: string = `${environment.API_URL}/account`;

  constructor(private http: HttpClient) {}

  getAccountByNumber(accountNumber: string): Observable<AccountResponse> {
    const url = `${this.baseUrl}/account/by-number`;
    return this.http.get<AccountResponse>(url, {
      params: new HttpParams().set('account_number', accountNumber),
    });
  }

  getAccountsByCui(cui: string): Observable<AccountsByCuiResponse> {
    const url = `${this.baseUrl}/accounts/by-cui`;
    return this.http.get<AccountsByCuiResponse>(url, {
      params: new HttpParams().set('cui', cui),
    });
  }

  getUserPhoto(accountNumber: string): Observable<{ message: string; photo_path: string }> {
    const url = `${this.updaterl}/photography`;
    return this.http.get<{ message: string; photo_path: string }>(url, {
      params: new HttpParams().set('account_number', accountNumber),
    });
  }
  
  getSecurityQuestion(accountNumber: string): Observable<{ message: string; security_question: string }> {
    const url = `${this.updaterl}/security-question`;
    return this.http.get<{ message: string; security_question: string }>(url, {
      params: new HttpParams().set('account_number', accountNumber),
    });
  }
  
  updateAccountWithoutImage(payload: any): Observable<{ message: string }> {
    const url = `${this.updaterl}/update`;
    return this.http.patch<{ message: string }>(url, payload);
  }

  updateAccountWithImage(formData: FormData): Observable<{ message: string }> {
    const url = `${this.updaterl}/update`;
    const headers = new HttpHeaders();
    return this.http.patch<{ message: string }>(url, formData, { headers });
  }
} 

