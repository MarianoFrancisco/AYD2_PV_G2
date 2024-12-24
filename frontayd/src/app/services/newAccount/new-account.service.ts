import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewAccount, NewAccountResponse, ResponseUpdateCurrency, UpdateCurrency } from '../../interfaces/new-account';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {
  private urlApi:string = `${environment.API_URL}`

  constructor(private http: HttpClient) { }

  createAccount(data: NewAccount ): Observable<NewAccountResponse>{
    const formData = new FormData();

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('cui', data.cui);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('age', data.age.toString());
    formData.append('gender', data.gender);
    formData.append('accountType', data.accountType);
    formData.append('securityQuestion', data.securityQuestion);
    formData.append('securityAnswer', data.securityAnswer);
    formData.append('amount', data.amount.toString());
    formData.append('photo64', data.photo64);
    
    return this.http.post<NewAccountResponse>(`${this.urlApi}/create/createAccount`,formData)
  }

  updateCurrency(data: UpdateCurrency): Observable<ResponseUpdateCurrency>{
    return this.http.put<ResponseUpdateCurrency>(`${this.urlApi}/accounts/update-currency`,data)
  }
}
