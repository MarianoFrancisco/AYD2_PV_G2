import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from '../../../services/payments/payments.service';
import Swal from 'sweetalert2';
import { ResponsePayments, VoucherPayments } from '../../../interfaces/payments';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  payments: ResponsePayments = {
    id: 0,
    service_type: '',
    service_code: '',
    amount: 0,
    created_at: '',
  };
  voucher: VoucherPayments = {
    account_number: '',
    name: '',
    signature: ''
  };
  availableServices = [
    { name: 'Agua' },
    { name: 'Luz' },
    { name: 'Teléfono' },
    { name: 'Internet' }
  ];
  

  constructor(private paymentServices: PaymentsService) {}

  paymentsForm = new FormGroup({
    tipoPago: new FormControl('', Validators.required),
    codigoServicio: new FormControl('', [Validators.required, Validators.minLength(5)]),
    montoPagar: new FormControl('', Validators.required),
    numeroCuenta: new FormControl('', Validators.required),
    dpi: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    paymentType: new FormControl('service', Validators.required)
  });

  pagar() {
    const values = this.paymentsForm.value;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    if (values.paymentType === 'service') {
      this.paymentServices.sendServicePayment({
        id: user.id.toString(),
        accountNumber: values.numeroCuenta || '',
        dpi: values.dpi || '',
        serviceName: values.tipoPago || '',
        serviceCode: values.codigoServicio || '',
        amount: Number(values.montoPagar) || 0,
        paymentType: 'service'
      }).subscribe({
        next: (data) => {
          this.payments = data.payment;
          this.payments.created_at = new Date(Number(this.payments.created_at) * 1000).toLocaleString();
          this.voucher = data.voucher;
  
          this.limpiarForm();
  
          Swal.fire({
            icon: 'success',
            title: 'Pago registrado',
            text: 'El pago ha sido registrado exitosamente.'
          });
  
          // Generar el voucher automáticamente después de realizar el pago
          this.generateVoucher();
        },
        error: () => {
          this.limpiarResponse();
          this.limpiarForm();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo registrar el pago. Intente nuevamente.'
          });
        }
      });
    } else if (values.paymentType === 'cash') {
      this.paymentServices.sendCashPayment({
        id: user.id.toString(),
        accountNumber: values.numeroCuenta || '',
        dpi: values.dpi || '',
        serviceName: 'Pago en efectivo',
        serviceCode: 'N/A',
        amount: Number(values.montoPagar) || 0,
        paymentType: 'cash'
      }).subscribe({
        next: (data) => {
          this.payments = data.payment;
          this.payments.created_at = new Date(Number(this.payments.created_at) * 1000).toLocaleString();
          this.voucher = data.voucher;
  
          this.limpiarForm();
  
          Swal.fire({
            icon: 'success',
            title: 'Pago registrado',
            text: 'El pago ha sido registrado exitosamente.'
          });
  
          // Generar Voucher
          this.generateVoucher();
        },
        error: () => {
          this.limpiarResponse();
          this.limpiarForm();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo registrar el pago. Intente nuevamente.'
          });
        }
      });
    }
  }
  

  limpiarForm() {
    this.paymentsForm.patchValue({
      tipoPago: '',
      codigoServicio: '',
      montoPagar: '',
      numeroCuenta: '',
      paymentType: 'service'
    });
  }

  limpiarResponse() {
    this.payments = {
      id: 0,
      service_type: '',
      service_code: '',
      amount: 0,
      created_at: ''
    };
    this.voucher = {
      account_number: '',
      name: '',
      signature: ''
    };
  }

  generateVoucher() {
    if (this.voucher.account_number === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No tienes ningún voucher disponible.'
      });
      return;
    }
  
    const doc = new jsPDF();
    const signatureUrl = this.voucher.signature;
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text('Recibo de Pago de Servicios Money Bin', 105, 20, { align: 'center' });
  
    doc.setFontSize(12);
    doc.text('Fecha:', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.payments.created_at}`, 50, 40);
  
    doc.setFont('helvetica', 'bold');
    doc.text('Servicio:', 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.payments.service_type}`, 50, 50);
  
    doc.setFont('helvetica', 'bold');
    doc.text('Código:', 130, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.payments.service_code}`, 160, 50);
  
    doc.setFont('helvetica', 'bold');
    doc.text('Monto:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Q.${this.payments.amount}`, 50, 60);
  
    doc.setFont('helvetica', 'bold');
    doc.text('Cuenta:', 130, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.voucher.account_number}`, 160, 60);
  
    doc.setFont('helvetica', 'bold');
    doc.text('Nombre del Titular:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.voucher.name}`, 60, 70);
  
    doc.setFont('helvetica', 'bold');
    doc.text('Firma Empleado:', 20, 80);
  
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = signatureUrl;
  
    image.onload = () => {
      doc.addImage(image, 'PNG', 20, 90, 50, 30);
      doc.save(`Servicio_${this.payments.service_type}_${this.payments.service_code}.pdf`);
    };
  
    image.onerror = () => {
      Swal.fire('Error', 'No se pudo cargar la firma para el recibo.', 'error');
    };
  }
}