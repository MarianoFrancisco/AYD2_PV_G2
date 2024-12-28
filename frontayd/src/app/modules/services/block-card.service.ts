import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlockCardRequest, BlockCardResponse, SecurityQuestionResponse } from '../../interfaces/block-card';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlockCardService {
  private baseUrl = `${environment.API_URL}/block-card`;

  constructor(private http: HttpClient) {}

  // Obtener pregunta y respuesta de seguridad
  getSecurityQuestion(cardNumber: string): Observable<SecurityQuestionResponse> {
    return this.http.post<SecurityQuestionResponse>(`${this.baseUrl}/security`, { card_number: cardNumber });
  }

  // Bloquear tarjeta
  blockCard(data: BlockCardRequest): Observable<BlockCardResponse> {
    return this.http.post<BlockCardResponse>(`${this.baseUrl}/block`, data);
  }
}
