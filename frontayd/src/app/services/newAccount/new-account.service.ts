import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewAccount } from '../../interfaces/new-account';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {
  private urlApi:string = `${environment.API_URL}/create/createAccount`

  constructor(private http: HttpClient) { }

  createAccount(data: NewAccount ): Observable<string>{
    return this.http.post<string>(this.urlApi,data)
  }
}
