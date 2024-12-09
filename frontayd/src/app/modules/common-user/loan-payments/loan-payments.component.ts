import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanPaymentsService } from '../../../services/loan-payments/loan-payments.service';
import { Payment, Loan_state } from '../../../interfaces/loan-payments';
import { VoucherPayments } from '../../../interfaces/payments';
import Swal from 'sweetalert2';

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
      loan_number: values.numeroPrestamo || "",
      amount: values.montoPagar || "0",
      cui: values.cuiPersona || "",
      pin: values.pinPersona || ""
    }).subscribe({
      next:(data) => {
        this.payment = data.payment
        this.payment.created_at = new Date(Number(this.payment.created_at) * 1000).toLocaleString();
        this.loanState = data.loanState
        this.voucher = data.voucher

        Swal.fire({ 
          icon: 'success',
          title: 'Pago registrado',
          text: 'El pago ha sido registrado exitosamente',
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'CUI o PIN incorrectos. Intente nuevamente.',
        });
      }
    });
  }
}
