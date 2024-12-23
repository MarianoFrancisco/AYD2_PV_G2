import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanPaymentsService } from '../../../services/loan-payments/loan-payments.service';
import { Payment, Loan_state, Loan_Payments, Loan } from '../../../interfaces/loan-payments';
import { VoucherPayments } from '../../../interfaces/payments';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-loan-payments',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './loan-payments.component.html',
  styleUrl: './loan-payments.component.scss'
})
export class LoanPaymentsComponent implements OnInit {
  payment: Payment = {
    created_at: "",
    id: 0,
    loan_id: 0,
    account_id: 0,
    amount: ""
  };

  loanState: Loan_state = {
    loanState: "",
  };

  voucher: VoucherPayments = {
    account_number: "",
    name: "",
    signature: ""
  };
  loans: Loan[] = [];
  userId: number = 0;
  accountNumber = '';

  constructor(private loanPaymentService: LoanPaymentsService) { }

  loanForm = new FormGroup({
    accountNumber: new FormControl('', Validators.required),
    loanId: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    paymentDate: new FormControl<Date | null>(null, Validators.required)
  });

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.id) {
      this.userId = user.id;
    }
  }

  fetchLoans(): void {
    if (!this.accountNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa un número de cuenta válido.',
      });
      return;
    }

    this.loanPaymentService.getLoans(this.accountNumber).subscribe({
      next: (response) => {
        this.loans = response.loans;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar los préstamos. Inténtalo nuevamente.',
        });
      }
    });
  }

  pagar() {
    if (!this.userId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró un usuario válido. Por favor, inicie sesión.',
      });
      return;
    }

    if (this.loanForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios y deben ser válidos.',
      });
      return;
    }
    const values = this.loanForm.value;

    const paymentData: Loan_Payments = {
      employee_id: this.userId,
      account_number: values.accountNumber || '',
      loan_id: Number(values.loanId || 0),
      amount: Number(values.amount || 0),
      payment_date: new Date(values.paymentDate || '').toISOString().split('T')[0]
    };

    this.loanPaymentService.sendPayment(paymentData).subscribe({
      next: (data) => {
        this.payment = data.payment;
        this.loanState = data.loanState;
        this.voucher = data.voucher;

        this.limpiarForm();

        Swal.fire({
          icon: 'success',
          title: 'Pago registrado',
          text: 'El pago ha sido registrado exitosamente.',
        });
      },
      error: (errorResponse) => {
        this.limpiarResponse();
        const backendMessage = errorResponse.error?.message;

        let errorMessage = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
        if (backendMessage === 'Account not found') {
          errorMessage = 'La cuenta especificada no existe.';
        } else if (backendMessage === 'Loan not found') {
          errorMessage = 'El préstamo especificado no existe.';
        } else if (backendMessage === 'Insufficient account balance') {
          errorMessage = 'Saldo insuficiente en la cuenta.';
        } else if (backendMessage === 'Payment exceeds remaining loan balance') {
          errorMessage = 'El monto del pago excede el saldo pendiente del préstamo.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    });
  }

  limpiarForm() {
    this.loanForm.reset();
  }

  limpiarResponse() {
    this.payment = {
      created_at: "",
      id: 0,
      loan_id: 0,
      account_id: 0,
      amount: ""
    };
    this.loanState = {
      loanState: "",
    };
    this.voucher = {
      account_number: "",
      name: "",
      signature: ""
    };
  }

  generateVoucher() {
    if (this.voucher.account_number === "") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No tienes ningún voucher disponible.',
      });
      return;
    }

    const doc = new jsPDF();
    const signatureUrl = `${this.voucher.signature}`;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text('Recibo de Pago de Prestamo Money Bin', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Fecha:', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.payment.created_at}`, 50, 40);

    doc.setFont('helvetica', 'bold');
    doc.text('Prestamo:', 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.payment.loan_id}`, 50, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('No. Cuenta:', 130, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(this.voucher.account_number, 160, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('Monto:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Q.${this.payment.amount}`, 50, 60);

    doc.setFont('helvetica', 'bold');
    doc.text('Estado de prestamo:', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.loanState.loanState}`, 70, 80);

    doc.setFont('helvetica', 'bold');
    doc.text('Nombre del empleado:', 20, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.voucher.name}`, 70, 90);

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
