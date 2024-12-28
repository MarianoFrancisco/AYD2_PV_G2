import { Component } from '@angular/core';
import { BlockCardService } from '../../services/block-card.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-blockcards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blockcards.component.html',
  styleUrl: './blockcards.component.scss'
})
export class BlockcardsComponent {
  cardNumber: string = '';
  securityQuestion: string | null = null;
  securityAnswer: string = '';
  blockReason: 'Robo' | 'Pérdida' | 'Fraude' = 'Robo';
  blockedAt: number = Date.now();
  cardType: 'Crédito' | 'Débito' = 'Crédito';

  constructor(private blockCardService: BlockCardService) {}

  // Obtener la pregunta de seguridad
  fetchSecurityQuestion(): void {
    if (!this.cardNumber) {
      Swal.fire('Error', 'Por favor, ingresa el número de tarjeta.', 'error');
      return;
    }

    this.blockCardService.getSecurityQuestion(this.cardNumber).subscribe({
      next: (response) => {
        this.securityQuestion = response.security_question;
        Swal.fire('Pregunta obtenida', 'Responde la pregunta de seguridad para continuar.', 'info');
      },
      error: () => {
        Swal.fire('Error', 'No se pudo obtener la pregunta de seguridad.', 'error');
      },
    });
  }

  // Bloquear la tarjeta
  blockCard(): void {
    if (!this.securityQuestion || this.securityAnswer === '') {
      Swal.fire('Error', 'Debes responder la pregunta de seguridad.', 'error');
      return;
    }

    const blockData = {
      card_number: this.cardNumber,
      block_reason: this.blockReason,
      blocked_at: this.blockedAt,
    };

    this.blockCardService.blockCard(blockData).subscribe({
      next: (response) => {
        Swal.fire('Éxito', response.message, 'success');
        this.resetForm();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo bloquear la tarjeta.', 'error');
      },
    });
  }

  // Resetear el formulario
  resetForm(): void {
    this.cardNumber = '';
    this.securityQuestion = null;
    this.securityAnswer = '';
    this.blockReason = 'Robo';
    this.blockedAt = Date.now();
    this.cardType = 'Crédito';
  }
}