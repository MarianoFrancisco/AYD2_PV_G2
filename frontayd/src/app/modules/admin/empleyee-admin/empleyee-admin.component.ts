import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminsService } from '../../../services/admins/admins.service';
import { Employees } from '../../../interfaces/admins';

@Component({
  selector: 'app-empleyee-admin',
  standalone: true,
  imports: [],
  templateUrl: './empleyee-admin.component.html',
  styleUrl: './empleyee-admin.component.scss'
})
export class EmpleyeeAdminComponent {

  data: Employees[] = []
  
  constructor(private adminsService: AdminsService){}

  changeOnlyAdmins(admins: Employees) {
    Swal.fire({
      title: "Cambiar Contraseña",
      html: `<a href="" class="mt-4 inline-block text-blue-500 hover:underline">ver solicitud - ${admins.id_user}</a>`,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAdmins(admins.id_user)
      }
    });
  }

  deleteOnlyAdmins(admins: Employees) {
    Swal.fire({
      title: "Eliminar Empleado",
      html: `<a href="" class="mt-4 inline-block text-blue-500 hover:underline">ver solicitud - ${admins.id_user}</a>`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAdmins(admins.id_user)
      }
    });
  }

  deleteAdmins(id: number) {
    this.adminsService.deleteEmployes({id_user:id}).subscribe({
      next: (data) => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Información de Administradores',
          text: `Usuario eliminado correctamente`
        });
      },
      error: (err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Información de Administradores',
          text: `Error al eliminar usuario`
        });
      }
    })
  }

  convertirFecha(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

}
