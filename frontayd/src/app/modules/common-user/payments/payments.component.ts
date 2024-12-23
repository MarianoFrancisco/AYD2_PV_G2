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

  imagenRuta: string | null = null;

  constructor(private paymentServices: PaymentsService) { }

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

          this.generateVoucher();
        },
        error: (err) => {
          this.handleError(err);
        },
      });
    } else if (values.paymentType === 'cash') {
      this.paymentServices.sendCashPayment({
        id: user.id.toString(),
        accountNumber: values.numeroCuenta || '',
        dpi: values.dpi || '',
        serviceName: 'Pago en efectivo',
        serviceCode: values.codigoServicio || '',
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
        error: (err) => {
          this.handleError(err);
        },
      });
    }
  }

  private handleError(err: any) {
    let translatedMessage = 'Ocurrió un error inesperado. Intente nuevamente.';

    if (err.status === 400) {
      if (err.error.message === 'Insufficient balance in account.') {
        translatedMessage = 'Saldo insuficiente en la cuenta.';
      } else if (err.error.message === 'Account number, DPI, service name, service code, and amount are required.') {
        translatedMessage = 'Número de cuenta, DPI, nombre del servicio, código del servicio y monto son obligatorios.';
      } else if (err.error.message === 'Service name, service code, and amount are required.') {
        translatedMessage = 'El nombre del servicio, código del servicio y monto son obligatorios.';
      } else {
        translatedMessage = 'Error en la solicitud. Verifique los datos ingresados.';
      }
    } else if (err.status === 403) {
      if (err.error.message === 'Account not found or ownership mismatch.') {
        translatedMessage = 'No se encontró la cuenta o no coincide con el CUI proporcionado.';
      } else {
        translatedMessage = 'No tiene permisos para realizar esta acción.';
      }
    } else if (err.status === 500) {
      translatedMessage = 'Error interno del servidor. Por favor, intente más tarde.';
    }

    Swal.fire({
      icon: 'error',
      title: `Error`,
      text: translatedMessage,
    });
  }

  limpiarForm() {
    this.paymentsForm.patchValue({
      tipoPago: '',
      codigoServicio: '',
      montoPagar: '',
      numeroCuenta: '',
      paymentType: 'service',
      dpi: ''
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
    doc.text('Nombre de Empleado:', 20, 70);
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

  validarInformacion() {
    Swal.fire({
      title: 'Verificar Identidad Del Titular',
      input: 'text',
      inputLabel: 'Ingrese el número de cuenta',
      inputPlaceholder: 'Ejemplo: 1234567890',
      showCancelButton: true,
      confirmButtonText: 'Verificar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un número de cuenta.';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.obtenerImagen(result.value);
      }
    });
  }

  obtenerImagen(numeroCuenta: string) {
    this.paymentServices.obtenerRutaImagen(numeroCuenta).subscribe({
      next: (ruta: string) => {
        this.imagenRuta = ruta;
        Swal.fire({
          icon: 'success',
          title: 'Verificación Exitosa',
          text: 'Fotografía Del Titular Obtenida Exitosamente.',
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la Validación',
          text: 'No se pudo validar el número de cuenta. Verifique e intente nuevamente.',
        });
      },
    });
  }
}