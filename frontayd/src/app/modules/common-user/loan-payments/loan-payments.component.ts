import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanPaymentsService } from '../../../services/loan-payments/loan-payments.service';
import { Payment, Loan_state } from '../../../interfaces/loan-payments';
import { VoucherPayments } from '../../../interfaces/payments';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-loan-payments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './loan-payments.component.html',
  styleUrl: './loan-payments.component.scss'
})
export class LoanPaymentsComponent {

  payment: Payment = {
    created_at: "",
    id: 0,
    loan_id: 0,
    account_id: 0,
    amount: ""
  }
  loanState: Loan_state ={
    loanState:"",
  }
  voucher: VoucherPayments = {
    account_number: "",
    name: "",
    signature: ""
  }

  constructor(private loanPaymentService: LoanPaymentsService) {}

  loanForm = new FormGroup({
    numeroPrestamo: new FormControl('', Validators.required),
    montoPagar: new FormControl('', Validators.required),
    cuiPersona: new FormControl('', Validators.maxLength(13)),
    pinPersona: new FormControl('', Validators.required)
  });

  pagar(){
    const values = this.loanForm.value

    this.loanPaymentService.sendPayment({
      loan_number: Number(values.numeroPrestamo) || 0,
      amount: Number(values.montoPagar) || 0,
      cui: values.cuiPersona || "",
      pin: values.pinPersona || ""
    }).subscribe({
      next:(data) => {
        this.payment = data.payment
        this.payment.created_at = new Date(Number(this.payment.created_at) * 1000).toLocaleString();
        this.loanState = data.loanState
        this.voucher = data.voucher

        this.limpiarForm()

        Swal.fire({ 
          icon: 'success',
          title: 'Pago registrado',
          text: 'El pago ha sido registrado exitosamente',
        });
      },
      error: () => {
        this.limpiarResponse()
        this.limpiarForm()
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'CUI o PIN incorrectos. Intente nuevamente.',
        });
      }
    });
  }

  limpiarForm(){
    this.loanForm.patchValue({
      numeroPrestamo: '',
      montoPagar: '',
      cuiPersona: '',
      pinPersona: '',
    })
  }

  limpiarResponse(){
    this.payment = {
      created_at: "",
      id: 0,
      loan_id: 0,
      account_id: 0,
      amount: ""
    }
    this.loanState = {
      loanState:"",
    }
    this.voucher = {
      account_number: "",
      name: "",
      signature: ""
    }
  }

  generateVoucher(){
    if (this.voucher.account_number == ""){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No tienes ningún voucher disponible.',
      });
      return;
    }

    const doc = new jsPDF
    const signatureUrl = `http://localhost:5000/signature/${this.voucher.signature}`;

    // Título del documento
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text('Recibo de Pago de Prestamo Money Bin', 105, 20, { align: 'center' });

    // Fecha
    doc.setFontSize(12);
    doc.text('Fecha:', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.payment.created_at}`, 50, 40);

    // Prestamo y cuenta
    doc.setFont('helvetica', 'bold');
    doc.text('Prestamo:', 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.payment.loan_id}`, 50, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('No. Cuenta:', 130, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(this.voucher.account_number, 160, 50);

    // Estado y Monto
    doc.setFont('helvetica', 'bold');
    doc.text('Monto:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Q.${this.payment.amount}`, 50, 60);
  
    doc.setFont('helvetica', 'bold');
    doc.text('Estado de prestamo:', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.loanState}`, 70, 80);

    // Firma
    doc.setFont('helvetica', 'bold');
    doc.text('Firma Empleado:', 20, 100);
    const imgWidth = 50;
    const imgHeight = 30;
  
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = signatureUrl;
  
    image.onload = () => {
      doc.addImage(image, 'PNG', 20, 110, imgWidth, imgHeight);
      doc.save(`Prestamo_${this.payment.loan_id}.pdf`);
    };

    image.onerror = () => {
      Swal.fire('Error', 'No se pudo cargar la firma para el recibo.', 'error');
    };

  }
}
