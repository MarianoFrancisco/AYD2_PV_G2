import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  realizarRetiro(accountNumber: string, amount: number, withdrawalType: number): Observable<any> {
    const url = `${this.baseUrl}/withdrawal`;
    const body = {
      account_number: accountNumber,
      amount: amount,
      withdrawal_type: withdrawalType,
    };
    return this.http.post(url, body);
  }
}
