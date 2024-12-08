import { Injectable } from '@angular/core';
import { Payments, ResponsePayments, VoucherPayments } from '../../interfaces/payments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private urlApi:string = 'http://localhost:5000/api/payment-service'


  constructor(private http: HttpClient) { }

  //Metodo para envíar pago
  sendPayment(data: Payments ): Observable<{payment: ResponsePayments, voucher: VoucherPayments}>{
    //console.log(data)
    return this.http.post<{payment: ResponsePayments, voucher: VoucherPayments}>(this.urlApi,data)
  }
}
