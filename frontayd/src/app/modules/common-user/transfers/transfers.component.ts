import { Component } from '@angular/core';
import { DepositService } from '../../services/deposit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { DepositRequest } from '../../../interfaces/deposit.interface';
import { PaypalmentRequest } from '../../../interfaces/paypalment.interface';
import { PaypalmentService } from '../../services/paypalment.service';
@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.scss'
})
export class TransfersComponent {
  paypalmentData: PaypalmentRequest = {
    account_number: '',
    amount: 0,
    account_type: 'Monetaria',
    currency: 'Quetzales',
    allow_dollar_deposit: true,
    user_id: 0, // Inicialmente 0, se actualizará con el ID del localStorage
  };

  constructor(private paypalmentService: PaypalmentService) {
    this.setUserId();
  }

  // Método para obtener el ID del usuario desde localStorage
  setUserId(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.id) {
      this.paypalmentData.user_id = user.id;
    }
  }

  makePaypalment(): void {
    this.paypalmentService.makePaypalment(this.paypalmentData).subscribe({
      next: (response) => {
        Swal.fire('Éxito', response.message, 'success');
        this.generatePDF(response);
      },
      error: (err) => {
        console.error('Error al realizar el depósito:', err);
        Swal.fire('Error', 'Ocurrió un problema al realizar el pago.', 'error');
      },
    });
  }

  generatePDF(response: any): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Comprobante de Pago', 10, 10);

    doc.setFontSize(12);
    doc.text(`Cuenta: ${response.voucher.account_number}`, 10, 20);
    doc.text(`Nombre: ${response.voucher.name}`, 10, 30);
    doc.text(`Monto: ${response.transaction.amount} ${response.transaction.currency}`, 10, 40);
    doc.text(`Tipo de Cuenta: ${response.transaction.account_type}`, 10, 50);
    doc.text(`Descripción: ${response.transaction.description}`, 10, 60);
    doc.text(`Fecha: ${new Date(response.transaction.created_at * 1000).toLocaleString()}`, 10, 70);

    if (response.voucher.signature) {
      doc.text('Firma:', 10, 80);
      doc.addImage(response.voucher.signature, 'PNG', 10, 90, 50, 30);
    }

    doc.save('voucher.pdf');
  }
}
