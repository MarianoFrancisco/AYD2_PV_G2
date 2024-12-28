import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoanApplicationResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})

export class LoanApplicationService {
  private readonly apiUrl = `${environment.API_URL}/cancellation/requestLoan`;

  constructor(private http: HttpClient) {}

  submitLoanApplication(
    formData: FormData
  ): Observable<LoanApplicationResponse> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<LoanApplicationResponse>(this.apiUrl, formData, { headers });
  }
}
