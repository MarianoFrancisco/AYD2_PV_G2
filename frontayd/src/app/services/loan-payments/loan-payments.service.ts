import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan_Payments, Loan_state, Payment } from '../../interfaces/loan-payments';
import { VoucherPayments } from '../../interfaces/payments';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanPaymentsService {
  private urlApi:string = `${environment.API_URL}/loan-payment`

  constructor(private http: HttpClient) { }

  //Metodo para envíar pago
  sendPayment(data: Loan_Payments ): Observable<{payment: Payment, loanState: Loan_state, voucher: VoucherPayments}>{
      return this.http.post<{payment: Payment, loanState:Loan_state, voucher: VoucherPayments}>(this.urlApi,data)
  }
}
