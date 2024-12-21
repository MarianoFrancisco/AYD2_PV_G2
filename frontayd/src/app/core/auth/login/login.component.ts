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

    // Verificar si los campos están vacíos
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
        if (response.requiresTwoFactor) {
          this.router.navigate(['/mfa-factor']);
        } else {
          // LocalStore
          localStorage.setItem('user', JSON.stringify(response.user));
          Swal.fire({
            icon: 'success',
            title: 'Login exitoso',
            text: `Bienvenido ${response.user.name}`,
          });

          // Verificar los roles en la db porque no me pude conectar :0
          switch (response.user.role) {
            case 'Cajero':
              this.router.navigate(['/user/dashboard']);
              break;
            case 'Atención al Cliente':
              this.router.navigate(['customer/inicio-atencion-cliente']);
              break;
            case 'Supervisor':
              this.router.navigate(['supervisor/inicio-supervisor']);
              break;
            case 'Administrador':
              this.router.navigate(['admin/inicio-admin']);
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

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
