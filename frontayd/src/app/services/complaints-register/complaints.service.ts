import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplaintsRegister } from '../../interfaces/complaints-register';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private urlApi:string = `${environment.API_URL}/account/registrarQueja`

  constructor(private http: HttpClient) { }

  registerComplaints(data: ComplaintsRegister):Observable<string>{
    const formData = new FormData();

    formData.append('identificacion', data.identificacion);
    formData.append('tipoQueja', data.tipoQueja);
    formData.append('detalle', data.detalle);

    return this.http.post<string>(`${this.urlApi}`,formData)
  }
}
