import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admins, EliminaList } from '../../interfaces/admins';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  private urlApi:string = `${environment.API_URL}`

  constructor(private http: HttpClient) { }

  getAllAdmins():Observable<Admins[]>{
      return  this.http.get<Admins[]>(`${this.urlApi}/users`)
  }

  deleteUser(id:number):Observable<string>{
    return this.http.delete<string>(`${this.urlApi}/users/${id}`)
  }

  getAllEmployes():Observable<Admins[]>{
    return this.http.get<Admins[]>(`${this.urlApi}/users`)
  }

  //Eliminar empleados supervisor
  //Obtener solicitudes
  getAllEmployesDeleteList():Observable<EliminaList[]>{
    return this.http.get<EliminaList[]>(`${this.urlApi}/eliminar-empleado/get-employee-termination`)
  }
  //Eliminar empleado
  deleteEmployes(data: {id_user: number}):Observable<{message: string}>{
    return this.http.put<{message: string}>(`${this.urlApi}/eliminar-empleado/employee-termination/status`, data)
  }

  changePasswordEmploye(id:number):Observable<string>{
    return this.http.delete<string>(`${this.urlApi}/users/${id}`)
  }
}
