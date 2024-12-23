import { Injectable } from '@angular/core';
import { Payments, ResponsePayments, VoucherPayments } from '../../interfaces/payments';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private PAYMENT_SERVICE_URL: string = `${environment.API_URL}/payment-service`;
  private ACCOUNT_URL: string = `${environment.API_URL}/account`;
  private urlApiService: string = `${this.PAYMENT_SERVICE_URL}/account`;
  private urlApiCash: string = `${this.PAYMENT_SERVICE_URL}/cashier`;
  private ACOUNT_PHOTOGRAPHY_URL: string = `${this.ACCOUNT_URL}/photography`;

  constructor(private http: HttpClient) { }

  sendServicePayment(data: Payments): Observable<{ payment: ResponsePayments; voucher: VoucherPayments }> {
    return this.http.post<{ payment: ResponsePayments; voucher: VoucherPayments }>(this.urlApiService, data);
  }

  sendCashPayment(data: Payments): Observable<{ payment: ResponsePayments; voucher: VoucherPayments }> {
    return this.http.post<{ payment: ResponsePayments; voucher: VoucherPayments }>(this.urlApiCash, data);
  }

  obtenerRutaImagen(account_number: string): Observable<string> {
    return this.http.get<{ photo_path: string }>(`${this.ACOUNT_PHOTOGRAPHY_URL}?account_number=${account_number}`)
      .pipe(
        map((response: { photo_path: any; }) => response.photo_path)
      );
  }
}
