import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  paymentsForm = new FormGroup({
    tipoPago: new FormControl('', Validators.required),
    nombreEncargado: new FormControl('', Validators.required),
    codigoServicio: new FormControl('', Validators.minLength(5)),
    montoPagar: new FormControl('', Validators.required),
    cuiPersona: new FormControl('', Validators.maxLength(13)),
    pinPersona: new FormControl('', Validators.required)
  });

  pagar(){
    console.log(this.paymentsForm.value)
  }
}
