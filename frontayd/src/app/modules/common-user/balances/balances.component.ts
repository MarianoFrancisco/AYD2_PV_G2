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
  cui: string = '';
  pin: string = '';
  saldo: string | null = null;
  ultimaActualizacion: string | null = null;

  constructor(private accountService: AccountService) {}

  validarUsuario() {
    if (!this.cui || !this.pin) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, ingrese el CUI y el PIN.',
      });
      return;
    }

    this.accountService.getBalance(this.cui, this.pin).subscribe({
      next: (data) => {
        this.saldo = data.Saldo;
        this.ultimaActualizacion = new Date(data.Fecha * 1000).toLocaleString();

        Swal.fire({
          icon: 'success',
          title: 'Saldo consultado exitosamente',
          html: `<strong>Saldo:</strong> Q${this.saldo}<br>
                 <strong>Última actualización:</strong> ${this.ultimaActualizacion}`,
        });
      },
      error: () => {
        this.saldo = null;
        this.ultimaActualizacion = null;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'CUI o PIN incorrectos. Intente nuevamente.',
        });
      },
    });
  }
}