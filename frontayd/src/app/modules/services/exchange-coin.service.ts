// src/app/services/exchange-coin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeCoinRequest, ExchangeCoinResponse } from '../../interfaces/exchange-coin.interface';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ExchangeCoinService {
  private apiUrl = `${environment.API_URL}/account/exchange-coin`;

  constructor(private http: HttpClient) {}

  // Método para realizar el cambio de moneda
  exchangeCoin(data: ExchangeCoinRequest): Observable<ExchangeCoinResponse> {
    return this.http.post<ExchangeCoinResponse>(this.apiUrl, data);
  }
}
