import { Component } from '@angular/core';
import { DepositService } from '../../services/deposit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.scss'
})
export class TransfersComponent {
  accountNumber = '';
  targetAccount = '';
  amount: number | null = null;
  depositType: string = '1'; // "1" para efectivo, "2" para transferencia

  receipt: any = null;

  constructor(private depositService: DepositService) {}

  makeDeposit() {
    if (!this.accountNumber || !this.amount || !this.depositType) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    const payload: any = {
      account_number: this.accountNumber,
      amount: this.amount,
      deposit_type: +this.depositType,
    };

    // Agregar target_account si es transferencia bancaria
    if (this.depositType === '2' && this.targetAccount) {
      payload.target_account = this.targetAccount;
    }

    this.depositService.deposit(payload).subscribe({
      next: (response) => {
        this.receipt = response;
        Swal.fire('Éxito', 'Depósito realizado con éxito.', 'success');
        this.limpiarFormulario();
      },
      error: (err) => {
        Swal.fire('Error', 'Hubo un problema al realizar el depósito.', 'error');
        console.error(err);
      },
    });
  }

  generatePDF() {
    if (!this.receipt) return;
  
    const doc = new jsPDF();
    // Ruta para la imagen
    const signatureUrl = `http://localhost:5000/signature/${this.receipt.voucher.signature}`;
  
    // Título del documento
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text('Recibo de Depósito Money Bin', 105, 20, { align: 'center' });
  
    // Fecha
    const fecha = new Date(this.receipt.transaction.created_at * 1000).toLocaleString();
    doc.setFontSize(12);
    doc.text('Fecha:', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(fecha, 50, 40);
  
    // Nombre y No. Cuenta
    doc.setFont('helvetica', 'bold');
    doc.text('Nombre:', 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(this.receipt.voucher.name, 50, 50);
  
    doc.setFont('helvetica', 'bold');
    doc.text('No. Cuenta:', 130, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(this.receipt.voucher.account_number, 160, 50);
  
    // Descripción y Monto
    doc.setFont('helvetica', 'bold');
    doc.text('Descripción:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(this.receipt.transaction.description, 50, 60);
  
    doc.setFont('helvetica', 'bold');
    doc.text('Monto:', 140, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Q${this.receipt.transaction.amount}`, 160, 60);
  
    // Firma
    doc.setFont('helvetica', 'bold');
    doc.text('Firma Empleado:', 20, 80);
    const imgWidth = 50;
    const imgHeight = 30;
  
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = signatureUrl;
  
    image.onload = () => {
      doc.addImage(image, 'PNG', 20, 90, imgWidth, imgHeight);
      doc.save(`Recibo_${this.receipt.voucher.account_number}.pdf`);
    };
  
    image.onerror = () => {
      Swal.fire('Error', 'No se pudo cargar la firma para el recibo.', 'error');
    };
  }  
  
  limpiarFormulario() {
    this.accountNumber = '';
    this.amount = null;
  }
}
