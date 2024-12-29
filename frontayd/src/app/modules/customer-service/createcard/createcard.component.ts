import { Component } from '@angular/core';
import { Card, CreateCardResponse } from '../../../interfaces/createCard';
import { CreateCardService } from '../../services/CreateCard.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-createcard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './createcard.component.html',
  styleUrl: './createcard.component.scss'
})
export class CreatecardComponent  {
  accountNumber: string = '';
  creditLimit: number = 0;
  issueDate: string = new Date().toISOString().split('T')[0];
  cardType: 'Débito' | 'Crédito' = 'Débito';
  createdCard: Card | null = null;

  isDateReadonly: boolean = true;

  constructor(private createCardService: CreateCardService) {}

  // Crear la tarjeta según el tipo seleccionado
  createCard(): void {
    if (!this.accountNumber || (this.cardType === 'Crédito' && !this.creditLimit) || !this.issueDate) {
      Swal.fire('Error', 'Por favor, ingresa todos los campos correctamente.', 'error');
      return;
    }
  
    const issueDateInMilliseconds = new Date(this.issueDate).getTime();

    if (this.cardType === 'Débito') {
      this.createDebitCard(issueDateInMilliseconds);
    } else {
      this.createCreditCard(issueDateInMilliseconds);
    }
  }
  
  // Crear tarjeta de débito
  createDebitCard(issueDate: number): void {
    this.createCardService.createDebitCard(this.accountNumber, issueDate).subscribe({
      next: (response: CreateCardResponse) => {
        Swal.fire('Éxito','Éxito en la solicitud de Tarjeta', 'success');
        this.createdCard = response.card;
      },
      error: (err) => {
        Swal.fire('Error', 'Hubo un problema al crear la tarjeta de débito.', 'error');
        console.error(err);
      },
    });
  }

  // Crear tarjeta de crédito
  createCreditCard(issueDate: number): void {
    this.createCardService.createCreditCard(this.accountNumber, this.creditLimit, issueDate).subscribe({
      next: (response: CreateCardResponse) => {
        Swal.fire('Éxito','Éxito en la solicitud de Tarjeta', 'success');
        this.createdCard = response.card;
      },
      error: (err) => {
        Swal.fire('Error', 'Hubo un problema al crear la tarjeta de crédito.', 'error');
        console.error(err);
      },
    });
  }

clearForm(): void {
  this.accountNumber = '';
  this.creditLimit = 0;
  this.cardType = 'Débito';
  this.createdCard = null;
}

}