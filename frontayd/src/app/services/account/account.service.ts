import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accounts, Transactions, UserDetail } from '../../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private urlApi:string = 'http://localhost:5000/api/client/get-client-info'

  constructor(private http: HttpClient) { }

  //Metodo para envíar pago
  getAllTransactions(data: Accounts ): Observable<{client: UserDetail, transactions: Transactions[]}>{
    const params = new HttpParams()
      .set(data.tipo,data.codigo)

    return this.http.get<{client: UserDetail, transactions: Transactions[]}>(this.urlApi,{params})
  }
}
