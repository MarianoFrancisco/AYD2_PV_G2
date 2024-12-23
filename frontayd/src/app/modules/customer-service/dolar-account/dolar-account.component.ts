import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NewAccountService } from '../../../services/newAccount/new-account.service';
import { UpdateCurrency } from '../../../interfaces/new-account';

@Component({
  selector: 'app-dolar-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dolar-account.component.html',
  styleUrl: './dolar-account.component.scss'
})
export class DolarAccountComponent {
  data: UpdateCurrency = {
    account_number: '',
  }

  accountForm = new FormGroup({
    account_number: new FormControl('', Validators.required),
  });

  constructor(private updateCurrencyService: NewAccountService){}

  updateCurrency(){
    const values = this.accountForm.value

    if(values.account_number != ''){
      this.data.account_number = values.account_number || ""
      this.updateCurrencyService.updateCurrency(this.data).subscribe({
        next: (data) => {
          this.limpiarForm()
          Swal.fire({
            icon: 'success',
            title: 'Cuenta en Dólares',
            text: `${data.message}`
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error.error.error}`
          });
          return
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No has ingresado un número de cuenta'
      });
      return
    }
  }

  limpiarForm(){
    this.accountForm.patchValue({
      account_number: '',
    })
  }
}
