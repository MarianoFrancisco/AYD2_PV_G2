import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-payments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './loan-payments.component.html',
  styleUrl: './loan-payments.component.scss'
})
export class LoanPaymentsComponent {
  loanForm = new FormGroup({
    cuentaPago: new FormControl('', Validators.required),
    numeroPrestamo: new FormControl('', Validators.required),
    montoPagar: new FormControl('', Validators.required),
    cuiPersona: new FormControl('', Validators.maxLength(13)),
    pinPersona: new FormControl('', Validators.required)
  });

  pagar(){
    console.log(this.loanForm.value)
  }
}
