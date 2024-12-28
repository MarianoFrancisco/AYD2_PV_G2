import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeRequest } from '../../interfaces/Employee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly baseUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  // Obtener solicitudes de cambio de información
  getRequestsChangeInfo(): Observable<{ Solicitudes: EmployeeRequest[] }> {
    return this.http.get<{ Solicitudes: EmployeeRequest[] }>(
      `${this.baseUrl}/cancellation/getRequestChangeInfo`
    );
  }

  // Actualizar la información de un empleado
  updateEmployeeInfo(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/changeInfo`, data);
  }
}
