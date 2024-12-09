import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account/account.service';
import { AccountDetail, Transactions, UserDetail } from '../../../interfaces/account';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  accountDetail: UserDetail = {
    id: 0,
    name: "",
    cui: "",
    email: "",
    phone: "",
    account:{
      id: 0,
      user_id: 0,
      account_number: "",
      balance: ""
    }
  }
  transactions: Transactions[] = []

  constructor(private accountServices: AccountService) {}

  accountForm = new FormGroup({
    tipoBusqueda: new FormControl('', Validators.required),
    codigoBusqueda: new FormControl('', Validators.required),
    //cuiPersona: new FormControl('', Validators.maxLength(13)),
    //pinPersona: new FormControl('', Validators.required)
  });

  buscar(){
    const values = this.accountForm.value

    this.accountServices.getAllTransactions({
      'tipo': values.tipoBusqueda || '',
      'codigo': values.codigoBusqueda || '',
    }).subscribe({
      next: (data) => {
        this.accountDetail = data.client
        this.transactions = data.transactions

        console.log(this.accountDetail)
        console.log(this.transactions)
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'CUI o Cuenta incorrectos. Intente nuevamente.',
        });
      },
    });
  }

  limpiarForm(){
    this.accountForm.patchValue({
      tipoBusqueda : '',
      codigoBusqueda : ''
    })
  }

  limpiarResponse(){
    this.accountDetail = {
      id: 0,
      name: "",
      cui: "",
      email: "",
      phone: "",
      account:{
        id: 0,
        user_id: 0,
        account_number: "",
        balance: ""
      }
    }
    this.transactions = []
  }

  formatDate(date: string): string{
    return  new Date(Number(date) * 1000).toLocaleString();
  }
}
