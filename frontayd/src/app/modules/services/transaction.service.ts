import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:5000/api';

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
