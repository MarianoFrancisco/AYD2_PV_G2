import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Admins } from '../../../interfaces/admins';
import { SupervisorsService } from '../../../services/supervisor/supervisors.service';

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss'
})
export class PasswordChangeComponent implements OnInit {
  data: Admins[] = []

  constructor(private supervisorServices: SupervisorsService) { }

  ngOnInit(): void {
    this.supervisorServices.getSolicitudChangePassword().subscribe({
      next: (data) => {
        this.data = data.Solicitudes
        console.log()
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }

  updatePassEmployee(admins: Admins) {
    Swal.fire({
      title: "Cambiar Contraseña Empleado",
      html: `
                <p class="mb-0 text-start">Contraseña de empleado a modificar: <strong>${admins.name}</strong></p><br>
                <p class="mb-0 text-start">¿Aprobar Cambio?</p><br>
              `,
      showCancelButton: true,
      confirmButtonText: "Cambiar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.updatePass(admins.user_name)
      }
    });
  }

  updatePass(user_name: string) {
    this.supervisorServices.aprobeUpdatePass(user_name).subscribe({
      next: (data) => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Cambiar Contraseña Empleado',
          text: `${data.message}`
        });
      },
      error: (err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Cambiar Contraseña Empleado',
          text: `${err.message}`
        });
      }
    })
  }

  convertirFecha(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

}
