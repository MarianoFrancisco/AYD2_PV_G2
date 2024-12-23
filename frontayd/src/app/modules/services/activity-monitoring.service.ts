import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Account {
  id: number;
  account_number: string;
  name: string;
  last_name: string;
  account_type: string;
}

interface Withdrawal {
  id: number;
  account_id: number;
  transaction_type: string;
  amount: string;
  description: string;
  created_at: number;
  account: Account;
}

interface Loan {
  id: number;
  account_id: number;
  loan_type: string;
  total_amount: string;
  remaining_balance: string;
  state: string;
  created_at: number;
  account: Account;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityMonitoringService {
  private baseUrl = `${environment.API_URL}/monitoring`;

  constructor(private http: HttpClient) {}

  getWithdrawals(): Observable<Withdrawal[]> {
    return this.http.get<Withdrawal[]>(`${this.baseUrl}/retiros`);
  }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/prestamos`);
  }
}
