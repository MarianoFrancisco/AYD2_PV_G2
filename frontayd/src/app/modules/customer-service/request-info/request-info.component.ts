import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RequestInfoService, User } from '../../services/RequestInfo.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-request-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-info.component.html',
  styleUrl: './request-info.component.scss'
})
export class RequestInfoComponent implements OnInit {
  user: User | null = null;
  userName: string = '';

  constructor(private requestInfoService: RequestInfoService) {}

  ngOnInit(): void {
    this.loadLoggedInUser();
  }

  // Cargar la información del usuario logueado
  loadLoggedInUser(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      Swal.fire('Error', 'No se encontró información del usuario en localStorage.', 'error');
      return;
    }

    const parsedUser = JSON.parse(userData);
    const userId = parsedUser.id;

    this.requestInfoService.getEmployees().subscribe({
      next: (response) => {
        const user = response.empleados.find((empleado) => empleado.id === userId);
        if (user) {
          this.user = user;
          this.userName = user.user_name;
        } else {
          Swal.fire('Error', 'Usuario no encontrado en la base de datos.', 'error');
        }
      },
      error: (err) => {
        console.error('Error al obtener empleados:', err);
        Swal.fire('Error', 'Hubo un problema al obtener los empleados.', 'error');
      },
    });
  }

  // Enviar la solicitud de cambio de información
  sendChangeInfoRequest(): void {
    if (!this.userName) {
      Swal.fire('Error', 'No se pudo determinar el nombre de usuario.', 'error');
      return;
    }

    this.requestInfoService.sendRequestChangeInfo(this.userName).subscribe({
      next: (response) => {
        Swal.fire({
          title: "Exito!",
          text: "solicitud de cambio de informacion.",
          icon: "success"
        });
        
      },
      error: (err) => {
        console.error('Error al enviar la solicitud:', err);
        Swal.fire('Error', 'Solicitud de cambio de contraseña inválido.', 'error');
      },
    });
  }
}