import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account/account.service';
import { AccountDetail, Transactions } from '../../../interfaces/account';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  transactions: Transactions[] = []
  AccountDetail: AccountDetail | undefined;

  constructor(private accountServices: AccountService) {}

  accountForm = new FormGroup({
    tipoBusqueda: new FormControl('', Validators.required),
    codigoBusqueda: new FormControl('', Validators.required),
    //cuiPersona: new FormControl('', Validators.maxLength(13)),
    //pinPersona: new FormControl('', Validators.required)
  });

  buscar() {
    const values = this.accountForm.value;
    const tipo = values.tipoBusqueda;
    const codigo = values.codigoBusqueda;

    // VALIDAR LOS CAMPOS VACIOS
    if (!tipo || !codigo) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Vacíos',
        text: 'Por favor, complete todos los campos antes de realizar la búsqueda.',
      });
      return;
    }

    if (tipo === 'account_number') {
      this.accountServices.getAccountByNumber(codigo).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Encontrado',
            text: 'Datos del usuario encontrados.',
          });
          this.AccountDetail = data.client;
          this.transactions = data.transactions;
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Cuenta no encontrada. Intente nuevamente.',
          });
        },
      });
    } else if (tipo === 'cui') {
      this.accountServices.getAccountsByCui(codigo).subscribe({
        next: (data) => {
          if (data.client.length > 0) {
            Swal.fire({
              icon: 'success',
              title: 'Encontrado',
              text: 'Datos del usuario encontrados.',
            });
            this.AccountDetail = data.client[0].account;
            this.transactions = data.client[0].transactions;
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Atención',
              text: 'No se encontraron cuentas asociadas a este CUI.',
            });
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'CUI incorrecto. Intente nuevamente.',
          });
        },
      });
    }
  } 
  

  limpiarForm(){
    this.accountForm.patchValue({
      tipoBusqueda : '',
      codigoBusqueda : ''
    })
  }

  limpiarResponse(){
    this.AccountDetail
    this.transactions = []
  }

  limpiarCampos() {
    this.limpiarForm(); // Limpia el formulario
    this.AccountDetail = undefined; // Limpia el detalle del usuario
    this.transactions = []; // Limpia la lista de transacciones
  }  

  formatDate(date: string): string{
    return  new Date(Number(date) * 1000).toLocaleString();
  }
}
