import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WithdrawalRequest, WithdrawalResponse } from '../../interfaces/withdrawal.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WithdrawalService {
  private readonly withdrawalUrl = `${environment.API_URL}/withdrawal`;

  constructor(private http: HttpClient) {}

  makeWithdrawal(request: WithdrawalRequest): Observable<WithdrawalResponse> {
    return this.http.post<WithdrawalResponse>(this.withdrawalUrl, request);
  }
}
