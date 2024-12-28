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

// Obtener todos los empleados
  getAllEmployees():Observable<{empleados : Admins[]}>{
    return  this.http.get<{empleados : Admins[]}>(`${this.urlApi}/account/getEmpleados`)
  }

//Eliminar Empleados
  deleteEmployes(id:number):Observable<string>{
    return this.http.delete<string>(`${this.urlApi}/users/${id}`)
  }


//Cambio de contraseñas
  updatePassEmployee(user_name:string):Observable<{message : string}>{
    const formData = new FormData();
    formData.append('user_name', user_name);

    return this.http.post<{message : string}>(`${this.urlApi}/cancellation//sendRequstChangePassword`, formData)
  }
  getSolicitudChangePassword():Observable<{Solicitudes : Admins[]}>{
    return  this.http.get<{Solicitudes : Admins[]}>(`${this.urlApi}/cancellation/getRequestChangePassword`)
  }
  aprobeUpdatePass(user_name:string):Observable<{message : string}>{
    const formData = new FormData();
    formData.append('user_name', user_name);

    return this.http.post<{message : string}>(`${this.urlApi}/account/changePassword`, formData)
  }


  getSolicitudCancelService():Observable<{empleados : Admins[]}>{
    return  this.http.get<{empleados : Admins[]}>(`${this.urlApi}/account/getEmpleados`)
  }
}
