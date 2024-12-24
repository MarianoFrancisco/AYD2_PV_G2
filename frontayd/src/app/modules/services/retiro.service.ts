import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RetiroResponse } from '../../interfaces/transaction-response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RetiroService {
  private readonly withdrawalUrl = `${environment.API_URL}withdrawal`;

  constructor(private http: HttpClient) {}

  withdraw(data: {
    account_number: string;
    amount: number;
    account_type: string;
    currency: string;
    user_id: number;
  }): Observable<RetiroResponse> {
    return this.http.post<RetiroResponse>(this.withdrawalUrl, data);
  }
}
