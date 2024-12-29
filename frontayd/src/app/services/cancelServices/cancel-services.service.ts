import { environment } from '../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CancelServices } from '../../interfaces/cancelServices';

@Injectable({
  providedIn: 'root'
})
export class CancelServicesService {
  private urlApi: string = `${environment.API_URL}`

  constructor(private http: HttpClient) { }

  createCancelService(data: CancelServices): Observable<string> {
    const formData = new FormData();

    formData.append('account_id', data.account_id);
    formData.append('reason', data.reason);
    formData.append('service', data.service);

    return this.http.post<string>(`${this.urlApi}/cancellation/cancelService`, formData)
  }
}
