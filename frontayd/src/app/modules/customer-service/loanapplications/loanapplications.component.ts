import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LoanApplicationService } from '../../services/loanapplications.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-loanapplications',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loanapplications.component.html',
  styleUrl: './loanapplications.component.scss'
})
export class LoanapplicationsComponent {
  accountId: string = '';
  typeLoan: string = 'Personal';
  mount: number | null = null;
  tiempo: number | null = null;
  plazo: string = 'años';
  pdfFile: File | null = null;

  constructor(private loanApplicationService: LoanApplicationService) {}

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.pdfFile = input.files[0];
    }
  }

  submitLoanApplication(): void {
    if (!this.accountId || !this.mount || !this.tiempo || !this.pdfFile) {
      Swal.fire('Error', 'Por favor, complete todos los campos.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('account_id', this.accountId);
    formData.append('type_loan', this.typeLoan);
    formData.append('mount', this.mount.toString());
    formData.append('tiempo', this.tiempo.toString());
    formData.append('plazo', this.plazo);
    formData.append('pdf', this.pdfFile);

    this.loanApplicationService.submitLoanApplication(formData).subscribe({
      next: (response) => {
        Swal.fire('Éxito', response.message, 'success').then(()=>{
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Error al enviar la solicitud de préstamo:', err);
        Swal.fire('Error', 'Hubo un error en el proceso.', 'error');
      },
    });
  }
}