import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChangeInfoResponse {
  message: string;
}

export interface User {
  id: number;
  name: string;
  role: string;
  user_name: string;
  email: string;
  phone: number;
  dpi_number: number;
  photo_path:string;

}

@Injectable({
  providedIn: 'root',
})
export class RequestInfoService {
  private readonly getEmployeesUrl = `${environment.API_URL}/account/getEmpleados`;
  private readonly sendRequestChangeInfoUrl = `${environment.API_URL}/cancellation/sendRequestChangeInfo`;

  constructor(private http: HttpClient) {}

  // Obtener los empleados
  getEmployees(): Observable<{ empleados: User[] }> {
    return this.http.get<{ empleados: User[] }>(this.getEmployeesUrl);
  }

  // Enviar solicitud de cambio de información
  sendRequestChangeInfo(userName: string): Observable<ChangeInfoResponse> {
    const formData = new FormData();
    formData.append('user_name', userName);

    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<ChangeInfoResponse>(this.sendRequestChangeInfoUrl, formData, { headers });
  }
}