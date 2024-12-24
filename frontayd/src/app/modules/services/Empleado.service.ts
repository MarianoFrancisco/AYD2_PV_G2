import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeRegisterResponse } from '../../interfaces/empleado';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmployeeRegisterService {
  private apiUrl = `${environment.API_URL}/account/registrarEmpleado`;
  private url = `${environment.API_URL}/account/registrarAdmin`;

  constructor(private http: HttpClient) {}

  registerEmployee(
    fullName: string,
    phone: string,
    age: number,
    cui: string,
    email: string,
    gender: string,
    maritalStatus: string,
    photo: File,
    pdf: File,
    role: string, 
  ): Observable<EmployeeRegisterResponse> {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('age', age.toString());
    formData.append('cui', cui);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('marital_status', maritalStatus);
    formData.append('photo', photo);
    formData.append('pdf', pdf);
    formData.append('role', role);

    return this.http.post<EmployeeRegisterResponse>(this.apiUrl, formData);
  }

  registerAdmin(
    fullName: string,
    phone: string,
    age: number,
    cui: string,
    email: string,
    gender: string,
    maritalStatus: string,
    photo: File,
    pdf: File
  ): Observable<EmployeeRegisterResponse> {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('age', age.toString());
    formData.append('cui', cui);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('marital_status', maritalStatus);
    formData.append('photo', photo);
    formData.append('pdf', pdf);

    return this.http.post<EmployeeRegisterResponse>(this.url, formData);
  }
}
