import { Component } from '@angular/core';
import { ExchangeCoinRequest, ExchangeCoinResponse } from '../../../interfaces/exchange-coin.interface';
import { ExchangeCoinService } from '../../services/exchange-coin.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cambios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cambios.component.html',
  styleUrl: './cambios.component.scss'
})
export class CambiosComponent {
  exchangeData: ExchangeCoinRequest = {
    cui: '', // El CUI será ingresado por el usuario
    amount: 0,
  };

  exchangeResult: ExchangeCoinResponse | null = null;

  constructor(private exchangeCoinService: ExchangeCoinService) {}

  // Método para realizar el cambio de moneda
  exchangeCoin(): void {
    this.exchangeCoinService.exchangeCoin(this.exchangeData).subscribe({
      next: (response) => {
        Swal.fire('Éxito', response.message, 'success');
        this.exchangeResult = response;
      },
      error: (err) => {
        console.error('Error al realizar el cambio de moneda:', err);
        Swal.fire('Error', 'Ocurrió un problema al realizar el cambio de moneda.', 'error');
      },
    });
  }
}
