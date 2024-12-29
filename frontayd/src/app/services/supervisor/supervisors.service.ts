import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admins, Employees } from '../../interfaces/admins';
import { Prestamos, Tarjetas } from '../../interfaces/aprobaciones';
import { ViewServicesCancel } from '../../interfaces/cancelServices';

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
  getAllEmployeesActive():Observable<Admins[]>{
    return  this.http.get<Admins[]>(`${this.urlApi}/eliminar-empleado/active-users`)
  }

//Eliminar Empleados
  deleteEmployes(empleado: Employees):Observable<{message : string}>{
    return this.http.post<{message : string}>(`${this.urlApi}/eliminar-empleado/employee-termination`,empleado)
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


//Solicitudes de prestamos
getSolicitudLoans():Observable<Prestamos[]>{
  return  this.http.get<Prestamos[]>(`${this.urlApi}/accept-loan/loan-requests-with-details`)
}
updateSolicitudLoans(data:{status:string}, id:number):Observable<{message : string}>{
  return  this.http.put<{message : string}>(`${this.urlApi}/accept-loan/loan-request/${id}`,data)
}


//Solicitud de tarjetas
getSolicitudCards():Observable<Tarjetas[]>{
  return  this.http.get<Tarjetas[]>(`${this.urlApi}/accept-card/cards-with-accounts`)
}
updateSolicitudCards(data:{status:string}, id:number):Observable<{message : string}>{
  return  this.http.put<{message : string}>(`${this.urlApi}/accept-card/card/${id}`,data)
}

// Solicitud de Servicios
  getSolicitudCancelService():Observable<ViewServicesCancel[]>{
    return  this.http.get<ViewServicesCancel[]>(`${this.urlApi}/service-cancelation/get-all-services`)
  }
  aprobeCancelService(data:{service_cancellation_id: number, account_id:number}):Observable<{message : string}>{
    return this.http.post<{message : string}>(`${this.urlApi}/service-cancelation/accept-service-cancelation`, data)
  }
}
