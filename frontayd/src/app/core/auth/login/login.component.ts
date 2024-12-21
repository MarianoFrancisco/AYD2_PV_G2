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

  hideConfirmPassword = true;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

login(){
  if (this.loginForm.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacíos o inválidos',
      text: 'Por favor, complete todos los campos correctamente.',
    });
    return;
    }
}

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
