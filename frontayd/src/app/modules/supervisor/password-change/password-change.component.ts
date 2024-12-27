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
    this.supervisorServices.getAllEmployees().subscribe({
      next: (data) => {
        this.data = data.empleados
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
                <p class="mb-0 text-start">¿Seguro que desea enviar una solicitud de cambio?</p><br>
              `,
      showCancelButton: true,
      confirmButtonText: "Solicitar Cambio",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.updatePass(admins.id)
      }
    });
  }

  updatePass(id: number) {
    this.supervisorServices.updatePassEmployee(id).subscribe({
      next: (data) => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Cambiar Contraseña Empleado',
          text: `Solicitud enviada correctamente`
        });
      },
      error: (err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Cambiar Contraseña Empleado',
          text: `Error al enviar la solicitud`
        });
      }
    })
  }

  convertirFecha(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

}
