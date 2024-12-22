import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  private apiUrl = `${environment.API_URL}/deposit/deposit`;

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
