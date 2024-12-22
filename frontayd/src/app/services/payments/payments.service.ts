import { Injectable } from '@angular/core';
import { Payments, ResponsePayments, VoucherPayments } from '../../interfaces/payments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private urlApiService: string = 'http://localhost:5000/api/payment-service/account';
  private urlApiCash: string = 'http://localhost:5000/api/payment-service/cashier'; // nuevo endpoint

  constructor(private http: HttpClient) {}

  // Método para enviar el pago de servicio
  sendServicePayment(data: Payments): Observable<{ payment: ResponsePayments; voucher: VoucherPayments }> {
    return this.http.post<{ payment: ResponsePayments; voucher: VoucherPayments }>(this.urlApiService, data);
  }

  // Método para enviar el pago en efectivo
  sendCashPayment(data: Payments): Observable<{ payment: ResponsePayments; voucher: VoucherPayments }> {
    return this.http.post<{ payment: ResponsePayments; voucher: VoucherPayments }>(this.urlApiCash, data);
  }
}
