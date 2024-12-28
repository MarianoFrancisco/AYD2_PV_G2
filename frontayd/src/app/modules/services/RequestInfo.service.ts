import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RequestInfoResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class RequestInfoService {
  private readonly apiUrl = `${environment.API_URL}/cancellation/sendRequestChangeInfo`;

  constructor(private http: HttpClient) {}

  sendRequest(userName: string): Observable<RequestInfoResponse> {
    const formData = new FormData();
    formData.append('user_name', userName);

    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<RequestInfoResponse>(this.apiUrl, formData, { headers });
  }
}
