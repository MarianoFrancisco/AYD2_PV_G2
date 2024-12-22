import { LoginService } from './../../service/login.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InicioNavbarComponent } from "../../../shared/layouts/inicio-navbar/inicio-navbar.component";
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InicioNavbarComponent, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router: Router = inject(Router)
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService);
  hideConfirmPassword = true;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  login() {
    const { email, password } = this.loginForm.value;
  
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de continuar.',
      });
      return;
    }
  
    this.loginService.login(email, password).subscribe({
      next: (response) => {
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('identifier', email);

        if (response.user.role === 'Administrador de Sistemas') {
          this.redirectByRole(response.user.role, email, password);
        }
         else if (response.requiresTwoFactor) {
          
          this.router.navigate(['/mfa-factor']);
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Login exitoso',
            text: `Bienvenido ${response.user.name}`,
          });
          this.redirectByRole(response.user.role, email, password);
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Usuario o contraseña incorrectos.',
        });
      },
    });
  }
  
  
  redirectByRole(role: string, email: string, password: string) {
    switch (role) {
      case 'Cajero':
        this.router.navigate(['/user/dashboard']);
        break;
      case 'Atención al Cliente':
        this.router.navigate(['/customer/inicio-atencion-cliente']);
        break;
      case 'Supervisor':
        this.router.navigate(['/supervisor/inicio-supervisor']);
        break;
      case 'Administrador de Sistemas':
        Swal.fire({
          title: 'Verificación adicional',
          input: 'password',
          inputLabel: 'Por favor, ingresa tu contraseña secundaria:',
          inputPlaceholder: 'Contraseña secundaria',
          showCancelButton: true,
          confirmButtonText: 'Validar',
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const secondPassword = result.value;
            this.loginService.validateAdmin(email, secondPassword).subscribe({
              next: (adminResponse) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Login exitoso',
                  text: `Bienvenido ${adminResponse.user.name}`,
                });
                this.router.navigate(['/admin/inicio-admin']);
              },
              error: () => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error de validación',
                  text: 'La contraseña secundaria no es válida.',
                });
              },
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Validación cancelada',
              text: 'No se completó la autenticación.',
            });
          }
        });
        break;
      default:
        Swal.fire({
          icon: 'error',
          title: 'Rol no válido',
          text: 'No se pudo determinar el rol del usuario.',
        });
        this.router.navigate(['/login']);
        break;
    }
  }
   

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
