import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from '../../../services/payments/payments.service';
import Swal from 'sweetalert2';
import { ResponsePayments, VoucherPayments } from '../../../interfaces/payments';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  payments: ResponsePayments = {
    id: 0,
    account_id:0,
    user_id: 0,
    service_type: "",
    service_code: "",
    amount: 0,
    created_at: ""
  }
  voucher: VoucherPayments = {
    account_number: "",
    name: "",
    signature: ""
  }


  constructor(private paymentServices: PaymentsService){}

  paymentsForm = new FormGroup({
    tipoPago: new FormControl('', Validators.required),
    nombreEncargado: new FormControl('', Validators.required),
    codigoServicio: new FormControl('', Validators.minLength(5)),
    montoPagar: new FormControl('', Validators.required),
    cuiPersona: new FormControl('', Validators.maxLength(13)),
    pinPersona: new FormControl('', Validators.required)
  });

  pagar(){
    const values = this.paymentsForm.value

    this.paymentServices.sendPayment({
      'service_name': values.tipoPago || '',
      'service_code':Number(values.codigoServicio) || 0,
      'amount': Number(values.montoPagar) || 0,
      'cui': values.cuiPersona || '',
      'pin': values.pinPersona || '',
    }).subscribe({
      next: (data) => {
        this.payments = data.payment
        this.payments.created_at = new Date(Number(this.payments.created_at) * 1000).toLocaleString();
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
      },
    });

  }
  limpiarForm(){
    this.paymentsForm.patchValue({
      tipoPago:'',
      nombreEncargado: '',
      codigoServicio: '',
      montoPagar: '',
      cuiPersona: '',
      pinPersona: ''
    })
  }

  limpiarResponse(){
    this.payments = {
      id: 0,
      account_id:0,
      user_id: 0,
      service_type: "",
      service_code: "",
      amount: 0,
      created_at: ""
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
    }
  }
}