import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardPaymentService } from '../../services/cardpayment.service';
import {PaymentRequest, PaymentResponse} from '../../../interfaces/cardcreditpayment';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pay-creditcard',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './pay-creditcard.component.html',
  styleUrl: './pay-creditcard.component.scss'
})
export class PayCreditcardComponent {
  paymentForm: FormGroup;

  constructor(
    private paymentService: CreditCardPaymentService,
    private fb: FormBuilder
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const today = new Date().toISOString().split('T')[0];

    this.paymentForm = this.fb.group({
      employee_id: [user?.id || null, [Validators.required]],
      account_id: [null, [Validators.required]],
      card_number: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      amount: [null, [Validators.required, Validators.min(0)]],
      payment_date: [today, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const paymentData: PaymentRequest = this.paymentForm.value;
      this.paymentService.payCreditCard(paymentData).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Éxito!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.generateVoucher(response);
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'El pago no pudo realizarse. Intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      this.showErrorMessage();
    }
  }

  private showErrorMessage() {
    let errorMessage = 'Por favor, complete todos los campos correctamente.';
  
    // Mostrar los errores de validación específicos en los campos
    if (this.paymentForm.get('account_id')?.hasError('required')) {
      errorMessage = 'El campo ID de la Cuenta es obligatorio.';
    } else if (this.paymentForm.get('card_number')?.hasError('required')) {
      errorMessage = 'El campo Número de Tarjeta es obligatorio.';
    } else if (this.paymentForm.get('card_number')?.hasError('pattern')) {
      errorMessage = 'El número de tarjeta no es válido. Debe tener 16 dígitos.';
    } else if (this.paymentForm.get('amount')?.hasError('required')) {
      errorMessage = 'El campo Monto es obligatorio.';
    } else if (this.paymentForm.get('amount')?.hasError('min')) {
      errorMessage = 'El monto debe ser mayor que 0.';
    }
  
    // Mostrar el mensaje general si aún no se han encontrado errores específicos
    Swal.fire({
      title: 'Formulario inválido',
      text: errorMessage,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  }
    
  private generateVoucher(data: any) {
    const doc = new jsPDF();
    const { account_details, employee_details, payment_details } = data;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text('Recibo de Pago de Servicios Money Bin', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Fecha:', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(payment_details.payment_date, 50, 40);

    doc.setFont('helvetica', 'bold');
    doc.text('Cuenta:', 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(account_details.account_number, 50, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('Titular:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`${account_details.name} ${account_details.last_name}`, 50, 60);

    doc.setFont('helvetica', 'bold');
    doc.text('Monto:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(`Q.${payment_details.amount}`, 50, 70);

    doc.setFont('helvetica', 'bold');
    doc.text('Tipo de Cuenta:', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(account_details.account_type, 53, 80);

    doc.setFont('helvetica', 'bold');
    doc.text('Firma del Empleado:', 20, 90);

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = employee_details.employeeSignature;

    image.onload = () => {
      doc.addImage(image, 'PNG', 20, 100, 50, 30);
      doc.save(`Voucher_${account_details.account_number}.pdf`);
    };

    image.onerror = () => {
      Swal.fire('Error', 'No se pudo cargar la firma para el recibo.', 'error');
    };
  }
}
