import { environment } from '../../../../src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Surveys } from '../../interfaces/surveys';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private urlApi:string = `${environment.API_URL}/survey-list`

  constructor(private http: HttpClient) { }

  getAllSurveys():Observable<Surveys[]>{
    return  this.http.get<Surveys[]>(this.urlApi)
  }
}
