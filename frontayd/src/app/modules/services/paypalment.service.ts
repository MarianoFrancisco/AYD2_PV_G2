import { PaypalmentRequest } from './../../interfaces/paypalment.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PaypalmentService {
  private apiUrl = `${environment.API_URL}/deposit`;

  constructor(private http: HttpClient) {}

  makePaypalment(paypalmentData: PaypalmentRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, paypalmentData);
  }
}
