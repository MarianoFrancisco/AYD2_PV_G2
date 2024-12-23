import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-balances',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.scss'
})
export class BalancesComponent {
  id: string = '';
  pin: string = '';
  saldo: string | null = null;
  dolar: number | null = null;
  ultimaActualizacion: string | null = null;

  constructor(private accountService: AccountService) {}

  validarUsuario() {
    if (!this.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, ingrese todos los campos.',
      });
      return;
    }

    this.accountService.getBalance(this.id).subscribe({
      next: (data) => {
        this.saldo = data.Saldo;
        this.dolar = data.Moneda.toLowerCase().includes("dólares")? Number(this.saldo)/8:null
        this.ultimaActualizacion = new Date(data.Fecha * 1000).toLocaleString();

        Swal.fire({
          icon: 'success',
          title: 'Saldo consultado exitosamente',
          html: `<strong>Saldo:</strong> Q${this.saldo}<br>
                ${this.dolar?`<strong>Saldo:</strong> $${this.dolar}<br>`: ''}
                 <strong>Última actualización:</strong> ${this.ultimaActualizacion}`,
        });
      },
      error: (error) => {
        this.saldo = null;
        this.ultimaActualizacion = null;
        this.dolar= null
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cuenta incorrecta. Intente nuevamente.',
        });
      },
    });
  }
}