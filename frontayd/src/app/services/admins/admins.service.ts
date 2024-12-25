import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admins, Employees } from '../../interfaces/admins';

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

  getAllEmployes():Observable<Employees[]>{
    return this.http.get<Employees[]>(`${this.urlApi}/users`)
  }

  deleteEmployes(id:number):Observable<string>{
    return this.http.delete<string>(`${this.urlApi}/users/${id}`)
  }

  changePasswordEmploye(id:number):Observable<string>{
    return this.http.delete<string>(`${this.urlApi}/users/${id}`)
  }
}
