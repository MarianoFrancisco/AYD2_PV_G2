import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  private apiUrl = 'http://localhost:5000/api/deposit/deposit';

  constructor(private http: HttpClient) {}

  deposit(data: {
    account_number: string;
    amount: number;
    deposit_type: number;
    target_account?: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
