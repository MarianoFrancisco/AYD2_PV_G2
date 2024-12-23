import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivityMonitoringService } from '../../services/activity-monitoring.service';
import { CommonModule } from '@angular/common';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity-monitoring',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './activity-monitoring.component.html',
  styleUrl: './activity-monitoring.component.scss'
})
export class ActivityMonitoringComponent implements OnInit {
  withdrawals: any[] = [];
  loans: any[] = [];

  // Datos para los gráficos
  withdrawalsChartData: any[] = [];
  loansChartData: any[] = [];

  // Esquema de colores para los gráficos
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']
  };

  constructor(private monitoringService: ActivityMonitoringService) {}

  ngOnInit(): void {
    this.loadWithdrawals();
    this.loadLoans();
  }

  loadWithdrawals(): void {
    this.monitoringService.getWithdrawals().subscribe((data) => {
      this.withdrawals = data;
      this.prepareWithdrawalsChartData();
    });
  }

  loadLoans(): void {
    this.monitoringService.getLoans().subscribe((data) => {
      this.loans = data;
      this.prepareLoansChartData();
    });
  }

  prepareWithdrawalsChartData(): void {
    const grouped = this.withdrawals.reduce((acc: any, curr: any) => {
      // Agrupa por un identificador único, como el ID del retiro
      const key = `Retiro ${curr.id}`;
      acc[key] = (acc[key] || 0) + curr.amount;
      return acc;
    }, {});
  
    // Convierte los datos agrupados en un arreglo para la gráfica
    this.withdrawalsChartData = Object.keys(grouped).map(key => ({
      name: key,
      value: grouped[key]
    }));
  }
  
  

  prepareLoansChartData(): void {
    const grouped = this.loans.reduce((acc: any, curr: any) => {
      // Asegúrate de que 'loan_type' es válido
      const type = curr.loan_type || 'Desconocido';
      acc[type] = (acc[type] || 0) + curr.total_amount;
      return acc;
    }, {});
  
    // Si no hay suficientes datos, agrega tipos de préstamos predeterminados
    const defaultLoanTypes = ['Personal', 'Hipotecario', 'Educativo', 'Automotriz'];
    defaultLoanTypes.forEach(type => {
      if (!grouped[type]) {
        grouped[type] = 0; // Valor predeterminado para tipos faltantes
      }
    });
  
    this.loansChartData = Object.keys(grouped).map(key => ({
      name: key,
      value: grouped[key]
    }));
  }
  
}