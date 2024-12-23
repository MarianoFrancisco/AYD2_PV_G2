import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PaymentRequest, PaymentResponse} from '../../interfaces/cardcreditpayment';
import { environment } from '../../../../src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CreditCardPaymentService {
  private readonly apiUrl = `${environment.API_URL}/pay-credit-card`;


  constructor(private http: HttpClient) {}

  payCreditCard(data: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(this.apiUrl, data);
  }
}
