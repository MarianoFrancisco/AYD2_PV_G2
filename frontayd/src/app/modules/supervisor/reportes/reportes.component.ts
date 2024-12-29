import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReportesService } from '../../services/reportes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportePrestamos, ReporteSolicitudes, ReporteTransacciones } from '../../../interfaces/reportes';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {

  reportePrestamos: ReportePrestamos[] = [];
  reporteSolicitudes: ReporteSolicitudes | null = null;
  reporteTransacciones: ReporteTransacciones[] = [];

  searchQuery: string = ''; // Búsqueda global
  searchPrestamos: string = '';
  searchSolicitudes: string = '';
  searchTransacciones: string = '';

  // Filtros por tipo
  selectedTipoPrestamo: string = '';
  selectedTipoSolicitud: string = '';

  // Tipos disponibles
  tiposPrestamos: string[] = ['Personal', 'Hipotecario', 'Vehicular'];
  tiposSolicitudes: string[] = ['Cambio de contraseña', ' Cancelacion de servicio	', ' Débito ', 'Crédito'];

  prestamosTipoChartData: any[] = [];
  transaccionesMontoChartData: any[] = [];
  constructor(private reportesService: ReportesService) {}

   // Opción 2: Definir colores personalizados
   colorScheme = 'cool';


  ngOnInit(): void {
    this.loadReportes();
  }

  loadReportes(): void {
    this.reportesService.getReportePrestamos().subscribe(data => {
      this.reportePrestamos = data.message;
      this.preparePrestamosChartData();
    });

    this.reportesService.getReporteSolicitudes().subscribe(data => {
      this.reporteSolicitudes = data.solicitudes;
    });

    this.reportesService.getReporteTransacciones().subscribe(data => {
      this.reporteTransacciones = data.transacciones;
      this.prepareTransaccionesChartData(); 
    });
  }

  filteredPrestamos() {
    return this.reportePrestamos.filter(prestamo =>
      (this.selectedTipoPrestamo ? prestamo.loand_type === this.selectedTipoPrestamo : true) &&
      (prestamo.Account_number.includes(this.searchPrestamos) ||
      prestamo.loand_type.toLowerCase().includes(this.searchPrestamos.toLowerCase()) ||
      prestamo.total_amount.toString().includes(this.searchPrestamos) ||
      prestamo.remaining_balance.toString().includes(this.searchPrestamos) ||
      prestamo.state.toLowerCase().includes(this.searchPrestamos.toLowerCase()))
    );
  }

  filteredCambios() {
    return this.reporteSolicitudes?.cambios.filter(cambio =>
      (this.selectedTipoSolicitud ? cambio.type_request === this.selectedTipoSolicitud : true) &&
      (cambio.name.toLowerCase().includes(this.searchSolicitudes.toLowerCase()) ||
      cambio.type_request.toLowerCase().includes(this.searchSolicitudes.toLowerCase()) ||
      cambio.created_at.toLowerCase().includes(this.searchSolicitudes.toLowerCase()))
    ) || [];
  }

  filteredPrestamosSolicitudes() {
    return this.reporteSolicitudes?.prestamos.filter(prestamo =>
      (this.selectedTipoSolicitud ? prestamo.type_loan === this.selectedTipoSolicitud : true) &&
      (prestamo.name.toLowerCase().includes(this.searchSolicitudes.toLowerCase()) ||
      prestamo.type_loan.toLowerCase().includes(this.searchSolicitudes.toLowerCase()) ||
      prestamo.status.toLowerCase().includes(this.searchSolicitudes.toLowerCase()))
    ) || [];
  }

  filteredCancelaciones() {
    return this.reporteSolicitudes?.cancelacion.filter(cancelacion =>
      (this.selectedTipoSolicitud ? cancelacion.type === this.selectedTipoSolicitud : true) &&
      (cancelacion.name.toLowerCase().includes(this.searchSolicitudes.toLowerCase()) ||
      cancelacion.type.toLowerCase().includes(this.searchSolicitudes.toLowerCase()) ||
      cancelacion.created_at.toLowerCase().includes(this.searchSolicitudes.toLowerCase()))
    ) || [];
  }

  filteredCards() {
    return this.reporteSolicitudes?.cards.filter(card =>
      (this.selectedTipoSolicitud ? card.card_type === this.selectedTipoSolicitud : true) &&
      (card.name.toLowerCase().includes(this.searchSolicitudes.toLowerCase()) ||
      card.card_type.toLowerCase().includes(this.searchSolicitudes.toLowerCase()) ||
      card.status.toLowerCase().includes(this.searchSolicitudes.toLowerCase()))
    ) || [];
  }

  filteredTransacciones() {
    return this.reporteTransacciones.filter(transaccion =>
      transaccion.account_number.includes(this.searchTransacciones) ||
      transaccion.name.toLowerCase().includes(this.searchTransacciones.toLowerCase()) ||
      transaccion.pago_servicio_total.toString().includes(this.searchTransacciones) ||
      transaccion.pago_prestamos_total.toString().includes(this.searchTransacciones) ||
      transaccion.pago_credito_total.toString().includes(this.searchTransacciones) ||
      transaccion.retiro_total.toString().includes(this.searchTransacciones) ||
      transaccion.deposito_total.toString().includes(this.searchTransacciones) ||
      transaccion.dinero_total_cuenta.toString().includes(this.searchTransacciones)
    );
  }

    // Preparar los datos para el gráfico de tipos de préstamos
    preparePrestamosChartData(): void {
      const prestamosCount: { [key: string]: number } = {};
  
      this.reportePrestamos.forEach(prestamo => {
        if (prestamosCount[prestamo.loand_type]) {
          prestamosCount[prestamo.loand_type]++;
        } else {
          prestamosCount[prestamo.loand_type] = 1;
        }
      });
  
      this.prestamosTipoChartData = Object.keys(prestamosCount).map(tipo => ({
        name: tipo,
        value: prestamosCount[tipo]
      }));      
    }
  
    // Preparar los datos para el gráfico de monto total de transacciones
    prepareTransaccionesChartData(): void {
      const transaccionesCount: { [key: string]: number } = {
        'Pago de Servicio': 0,
        'Pago de Préstamos': 0,
        'Pago de Crédito': 0,
        'Retiro': 0,
        'Depósito': 0
      };
  
      this.reporteTransacciones.forEach(transaccion => {
        transaccionesCount['Pago de Servicio'] += transaccion.pago_servicio_total || 0;
        transaccionesCount['Pago de Préstamos'] += transaccion.pago_prestamos_total || 0;
        transaccionesCount['Pago de Crédito'] += transaccion.pago_credito_total || 0;
        transaccionesCount['Retiro'] += transaccion.retiro_total || 0;
        transaccionesCount['Depósito'] += transaccion.deposito_total || 0;
      });
  
      this.transaccionesMontoChartData = Object.keys(transaccionesCount).map(key => ({
        name: key,
        value: transaccionesCount[key]
      }));
    }
}