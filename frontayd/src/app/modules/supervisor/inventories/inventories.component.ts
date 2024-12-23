import { Component, OnInit } from '@angular/core';
import { Entry, Loan, WithdrawalTransaction } from '../../../interfaces/inventory';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventories.component.html',
  styleUrl: './inventories.component.scss',
  providers: [DatePipe], 
})
export class InventoriesComponent implements OnInit {
  capitalTotal: number = 0;
  entradas: Entry[] = [];
  salidasTransacciones: WithdrawalTransaction[] = [];
  salidasPrestamos: Loan[] = [];

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
}