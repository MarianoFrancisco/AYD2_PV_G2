// src/app/services/create-card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Card, CreateCardResponse } from '../../interfaces/createCard';

@Injectable({
  providedIn: 'root',
})
export class CreateCardService {
  private readonly createCardUrl = `${environment.API_URL}/create-card`;

  constructor(private http: HttpClient) {}

  // Crear tarjeta de débito
  createDebitCard(accountNumber: string, issueDate: number): Observable<CreateCardResponse> {
    const body = {
      account_number: accountNumber,
      card_type: 'Débito',
      issue_date: issueDate,
    };

    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<CreateCardResponse>(this.createCardUrl, body, { headers });
  }

  // Crear tarjeta de crédito
  createCreditCard(accountNumber: string, creditLimit: number, issueDate: number): Observable<CreateCardResponse> {
    const body = {
      account_number: accountNumber,
      card_type: 'Crédito',
      credit_limit: creditLimit,
      issue_date: issueDate,
    };

    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<CreateCardResponse>(this.createCardUrl, body, { headers });
  }
}
