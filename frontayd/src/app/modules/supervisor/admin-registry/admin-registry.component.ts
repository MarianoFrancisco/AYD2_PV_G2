import { EmployeeRegisterComponent } from './../../admin/employee-register/employee-register.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmployeeRegisterService } from '../../services/Empleado.service';
@Component({
  selector: 'app-admin-registry',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './admin-registry.component.html',
  styleUrl: './admin-registry.component.scss'
})
export class AdminRegistryComponent {
  fullName: string = '';
  phone: string = '';
  age: number | null = null;
  cui: string = '';
  email: string = '';
  gender: string = 'Masculino';
  maritalStatus: string = 'Soltero';
  photo: File | null = null;
  pdf: File | null = null;

  constructor(private employeeRegisterService: EmployeeRegisterService) {}

  onFileChange(event: Event, fileType: 'photo' | 'pdf'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (fileType === 'photo') {
        this.photo = input.files[0];
      } else if (fileType === 'pdf') {
        this.pdf = input.files[0];
      }
    }
  }

  onSubmit(): void {
    if (this.photo && this.pdf) {
      this.employeeRegisterService
        .registerAdmin(
          this.fullName,
          this.phone,
          this.age!,
          this.cui,
          this.email,
          this.gender,
          this.maritalStatus,
          this.photo,
          this.pdf
        )
        .subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Empleado creado',
              text: `${response.message}`,
              confirmButtonText: 'Aceptar',
            }).then(() => {
              window.location.reload();
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al crear el empleado.',
              confirmButtonText: 'Aceptar',
            });
            console.error(err);
          }
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Por favor, sube una foto y un documento PDF.',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
