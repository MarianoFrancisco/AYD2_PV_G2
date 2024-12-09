import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  accountNumber: string = '';
  amount: number | null = null;
  withdrawalType: number | null = null;
  receipt: any = null;

  constructor(private transactionService: TransactionService) {}

  realizarRetiro() {
    if (!this.accountNumber || !this.amount || !this.withdrawalType) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    this.transactionService
      .realizarRetiro(this.accountNumber, this.amount, Number(this.withdrawalType))
      .subscribe({
        next: (response) => {
          this.receipt = response;
          if (response.message === 'OK') {
            this.generarRecibo(response);
            Swal.fire('Éxito', 'El retiro se realizó correctamente.', 'success');
            this.limpiarFormulario();
          } else {
            Swal.fire('Error', 'No se pudo realizar el retiro.', 'error');
          }
        },
        error: () => {
          Swal.fire('Error', 'Ocurrió un error al procesar el retiro.', 'error');
        },
      });
  }

  generarRecibo(response: any) {
    const doc = new jsPDF();
    const signatureUrl = `http://localhost:5000/signature/${response.voucher.signature}`;

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Recibo de Retiro Money Bin', 105, 20, { align: 'center' });

    // Fecha
    const fecha = new Date(response.transaction.created_at * 1000).toLocaleString();
    doc.setFontSize(12);
    doc.text('Fecha:', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(fecha, 50, 40);

    // Nombre y No. Cuenta
    doc.setFont('helvetica', 'bold');
    doc.text('Nombre:', 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(response.voucher.name, 50, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('No. Cuenta:', 140, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(response.voucher.account_number, 180, 50);

    // Descripción y Monto
    doc.setFont('helvetica', 'bold');
    doc.text('Descripción:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(response.transaction.description, 50, 60);

    doc.setFont('helvetica', 'bold');
    doc.text('Monto:', 140, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Q${response.transaction.amount}`, 180, 60);

    // Firma
    doc.setFont('helvetica', 'bold');
    doc.text('Firma:', 20, 80);

    const imgWidth = 50;
    const imgHeight = 30;

    // Cargar la imagen de la firma
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = signatureUrl;

    image.onload = () => {
      doc.addImage(image, 'PNG', 20, 90, imgWidth, imgHeight);
      doc.save(`Recibo_${response.voucher.account_number}.pdf`);
    };

    image.onerror = () => {
      Swal.fire('Error', 'No se pudo cargar la firma para el recibo.', 'error');
    };
  }

  limpiarFormulario() {
    this.accountNumber = '';
    this.amount = null;
    this.withdrawalType = null;
  }
}
