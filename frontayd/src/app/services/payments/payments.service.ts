import { Injectable } from '@angular/core';
import { Payments } from '../../interfaces/payments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private urlApi:string = 'http://localhost:300/'


  constructor(private http: HttpClient) { }

  sendPayment(data: Payments ){
    this.http.post(this.urlApi,data)
  }
}
