import { Component } from '@angular/core';
import { BackupService } from '../../services/backup.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent {
  message: string = '';
  fileUrl: string = '';

  constructor(private backupService: BackupService) {}

  confirmBackup(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se realizará un respaldo de seguridad en el servicio S3.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, realizar respaldo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createBackup();
      }
    });
  }

  createBackup(): void {
    this.backupService.createBackup().subscribe({
      next: (response) => {
        this.message = response.message;
        this.fileUrl = response.fileUrl;
        Swal.fire('¡Éxito!', 'El respaldo se realizó correctamente.', 'success');
      },
      error: (err) => {
        console.error('Error al realizar el respaldo:', err);
        this.message = 'Ocurrió un error al realizar el respaldo.';
        Swal.fire('Error', 'Ocurrió un error al realizar el respaldo.', 'error');
      },
    });
  }
}
