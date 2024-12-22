import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = `${environment.API_URL}/account`;

  constructor(private http: HttpClient) {}

  // Método para consultar el saldo
  getBalance(cui: string, pin: string): Observable<{ Saldo: string; Fecha: number }> {
    const params = new HttpParams()
      .set('cui', cui)
      .set('pin', pin);
    return this.http.get<{ Saldo: string; Fecha: number }>(`${this.apiUrl}/show-balance`, { params });
  }
}
