import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../../interfaces/complaint'; // Importa el modelo de queja
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private readonly apiUrl = `${environment.API_URL}/complaint-list`;

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de quejas
  getComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.apiUrl);
  }
}
