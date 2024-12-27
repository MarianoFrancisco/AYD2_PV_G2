import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admins, Employees } from '../../interfaces/admins';

@Injectable({
  providedIn: 'root'
})
export class SupervisorsService {
  private urlApi:string = `${environment.API_URL}`

  constructor(private http: HttpClient) { }

  getAllEmployees():Observable<{empleados : Admins[]}>{
    return  this.http.get<{empleados : Admins[]}>(`${this.urlApi}/account/getEmpleados`)
  }

  deleteEmployes(id:number):Observable<string>{
    return this.http.delete<string>(`${this.urlApi}/users/${id}`)
  }

  updatePassEmployee(id:number):Observable<string>{
    return this.http.delete<string>(`${this.urlApi}/users/${id}`)
  }



  getSolicitudCancelService():Observable<{empleados : Admins[]}>{
    return  this.http.get<{empleados : Admins[]}>(`${this.urlApi}/account/getEmpleados`)
  }
}
