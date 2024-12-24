import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { DepositRequest } from '../../interfaces/deposit.interface';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  private apiUrl = `${environment.API_URL}/deposit`;

  constructor(private http: HttpClient) {}

  makeDeposit(depositData: DepositRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, depositData);
  }
}
