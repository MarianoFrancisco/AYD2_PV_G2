import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { InicioNavbarComponent } from "../../../shared/layouts/inicio-navbar/inicio-navbar.component";
@Component({
  selector: 'app-mfa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InicioNavbarComponent, FormsModule],
  templateUrl: './mfa.component.html',
  styleUrl: './mfa.component.scss'
})
export class MfaComponent {
  identifier: string = '';
  file: File | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const savedIdentifier = localStorage.getItem('identifier');
    if (savedIdentifier) {
      this.identifier = savedIdentifier;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.identifier || !this.file) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, complete todos los campos antes de continuar.',
      });
      return;
    }

    this.loginService.validateFile(this.identifier, this.file).subscribe({
      next: (response) => {

        localStorage.setItem('user', JSON.stringify(response.user));
        
        Swal.fire({
          icon: 'success',
          title: 'Autenticación Exitosa',
          text: `Bienvenido ${response.user.name}`,
        });
        localStorage.removeItem('identifier');
        this.router.navigate(['/supervisor/inicio-supervisor']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Autenticación',
          text: 'El archivo proporcionado no es válido.',
        });
      },
    });
  }
}
