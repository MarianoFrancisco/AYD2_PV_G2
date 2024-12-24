import { Component, OnInit } from '@angular/core';
import { Entry, Loan, WithdrawalTransaction } from '../../../interfaces/inventory';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-inventories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventories.component.html',
  styleUrl: './inventories.component.scss',
  providers: [DatePipe], 
})
export class InventoriesComponent implements OnInit {
  capitalTotal: number = 0;
  entradas: Entry[] = [];
  salidasTransacciones: WithdrawalTransaction[] = [];
  salidasPrestamos: Loan[] = [];
// Filtros
filterEntradaDescripcion: string = '';
filterEntradaFecha: string = '';
filterSalidaDescripcion: string = '';
filterSalidasFecha: string = '';
  filterPrestamosFecha: any;


  constructor(
    private inventoryService: InventoryService,
    private datePipe: DatePipe  // Inyectar DatePipe
  ) {}

  ngOnInit(): void {
    this.loadCapitalTotal();
    this.loadEntriesAndExits();
  }

  loadCapitalTotal(): void {
    this.inventoryService.getCapitalTotal().subscribe({
      next: (response) => {
        this.capitalTotal = response.Capital_Total;
      },
      error: (err) => {
        console.error('Error al obtener el capital total:', err);
      },
    });
  }

  loadEntriesAndExits(): void {
    this.inventoryService.getEntriesAndExits().subscribe({
      next: (response) => {
        this.entradas = response.entradas;
        this.salidasTransacciones = response.salidas.transacciones;
        this.salidasPrestamos = response.salidas.prestamos;

        // Convertir las fechas de entrada y salida
        this.entradas.forEach((entry) => {
          entry.created_at = this.datePipe.transform(entry.created_at * 1000, 'yyyy-MM-dd HH:mm:ss')!;
        });
        this.salidasTransacciones.forEach((transaction) => {
          transaction.created_at = this.datePipe.transform(transaction.created_at * 1000, 'yyyy-MM-dd HH:mm:ss')!;
        });
        this.salidasPrestamos.forEach((loan) => {
          loan.created_at = this.datePipe.transform(loan.created_at * 1000, 'yyyy-MM-dd HH:mm:ss')!;
        });
      },
      error: (err) => {
        console.error('Error al obtener entradas y salidas:', err);
      },
    });
  }

    // Filtrar Entradas
    filteredEntradas(): Entry[] {
      return this.entradas.filter((entry) => {
        const matchesDescripcion = entry.description.toLowerCase().includes(this.filterEntradaDescripcion.toLowerCase());
        const matchesFecha = this.filterEntradaFecha ? entry.created_at.startsWith(this.filterEntradaFecha) : true;
        return matchesDescripcion && matchesFecha;
      });
    }
  
   // Total de Entradas
   get totalEntradas(): number {
    return this.filteredEntradas()
      .map(entry => typeof entry.amount === 'number' ? entry.amount : parseFloat(entry.amount) || 0)
      .reduce((sum, amount) => sum + amount, 0);
  }
  


  // Métodos de filtrado
filteredSalidasTransacciones(): WithdrawalTransaction[] {
  return this.salidasTransacciones.filter((transaction) => {
    const matchesDescripcion = transaction.description.toLowerCase().includes(this.filterSalidaDescripcion.toLowerCase());
    const matchesFecha = this.filterSalidasFecha ? transaction.created_at.startsWith(this.filterSalidasFecha) : true;
    return matchesDescripcion && matchesFecha;
  });
}

filteredSalidasPrestamos(): Loan[] {
  return this.salidasPrestamos.filter((loan) => {
    return this.filterPrestamosFecha ? loan.created_at.startsWith(this.filterPrestamosFecha) : true;
  });
}
  // Totales
get totalSalidasTransacciones(): number {
  return this.filteredSalidasTransacciones()
    .map(transaction => typeof transaction.amount === 'number' ? transaction.amount : parseFloat(transaction.amount) || 0)
    .reduce((sum, amount) => sum + amount, 0);
}

get totalSalidasPrestamos(): number {
  return this.filteredSalidasPrestamos()
    .map(loan => typeof loan.total_amount === 'number' ? loan.total_amount : parseFloat(loan.total_amount) || 0)
    .reduce((sum, amount) => sum + amount, 0);
}

resetFilters(section: string): void {
  switch (section) {
    case 'entrada':
      this.filterEntradaDescripcion = '';
      this.filterEntradaFecha = '';
      break;
    case 'transaccion':
      this.filterSalidaDescripcion = '';
      this.filterSalidasFecha = '';
      break;
    case 'prestamo':

      break;
    default:
      console.error('Sección desconocida:', section);
  }
}

}