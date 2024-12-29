import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReportePrestamos, ReporteSolicitudes, ReporteTransacciones } from '../../interfaces/reportes';
@Injectable({
  providedIn: 'root',
})
export class ReportesService   {

    private apiUrl = `${environment.API_URL}/reportes`;
  
    constructor(private http: HttpClient) { }
  
    // Obtener reporte de préstamos
    getReportePrestamos(): Observable<{ message: ReportePrestamos[] }> {
      return this.http.get<{ message: ReportePrestamos[] }>(`${this.apiUrl}/reportePrestamos`);
    }
  
    // Obtener reporte de solicitudes
    getReporteSolicitudes(): Observable<{ solicitudes: ReporteSolicitudes }> {
      return this.http.get<{ solicitudes: ReporteSolicitudes }>(`${this.apiUrl}/reporteSolicitudes`);
    }
  
    // Obtener reporte de transacciones
    getReporteTransacciones(): Observable<{ transacciones: ReporteTransacciones[] }> {
      return this.http.get<{ transacciones: ReporteTransacciones[] }>(`${this.apiUrl}/reporteTransacciones`);
    }
  }