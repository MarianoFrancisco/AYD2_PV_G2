import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivityMonitoringService } from '../../services/activity-monitoring.service';
import { CommonModule } from '@angular/common';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity-monitoring',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule],
  templateUrl: './activity-monitoring.component.html',
  styleUrl: './activity-monitoring.component.scss'
})
export class ActivityMonitoringComponent implements OnInit {
  withdrawals: any[] = [];
  loans: any[] = [];
  alarmMessage: string = '';

  searchEmployee: string = '';
  searchDate: string = '';
  searchType: string = '';
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
  
  filteredWithdrawals() {
    return this.withdrawals.filter((withdrawal) => {
      const matchesEmployee =
        this.searchEmployee === '' ||
        (withdrawal.account.name + ' ' + withdrawal.account.last_name)
          .toLowerCase()
          .includes(this.searchEmployee.toLowerCase());
      const matchesDate =
        this.searchDate === '' || withdrawal.created_at.includes(this.searchDate);
      const matchesType =
        this.searchType === '' || 'Retiro'.includes(this.searchType);
      
      return matchesEmployee && matchesDate && matchesType;
    });
  }

  filteredLoans() {
    return this.loans.filter((loan) => {
      const matchesEmployee =
        this.searchEmployee === '' ||
        (loan.account.name + ' ' + loan.account.last_name)
          .toLowerCase()
          .includes(this.searchEmployee.toLowerCase());
      const matchesDate =
        this.searchDate === '' || loan.created_at.includes(this.searchDate);
      const matchesType =
        this.searchType === '' || loan.loan_type.includes(this.searchType);
      
      return matchesEmployee && matchesDate && matchesType;
    });
  }
  checkAlarm(userId: number): void {
    this.monitoringService.postAlarm(userId).subscribe((response) => {
      this.alarmMessage = response.message;
    });
  }
}