import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Satisfaction, SendSatisfaction } from '../../interfaces/satisfaction';


@Injectable({
  providedIn: 'root'
})
export class SatisfactionService {
  private urlApi:string = `${environment.API_URL}`

  constructor(private http: HttpClient) { }

  getQuestions():Observable<Satisfaction>{
    return this.http.get<Satisfaction>(`${environment.API_URL}/survey-questions`)
  }

  sendQuestions(data: SendSatisfaction):Observable<string>{
    return this.http.post<string>(`${environment.API_URL}/create-survey`,data)
  }
}
