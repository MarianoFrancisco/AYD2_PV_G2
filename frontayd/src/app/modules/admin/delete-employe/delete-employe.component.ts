import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminsService } from '../../../services/admins/admins.service';
import { Employees } from '../../../interfaces/admins';

@Component({
  selector: 'app-delete-employe',
  standalone: true,
  imports: [],
  templateUrl: './delete-employe.component.html',
  styleUrl: './delete-employe.component.scss'
})
export class DeleteEmployeComponent {

  data: Employees[] = []
  
  constructor(private adminsService: AdminsService){}
  
    deleteOnlyAdmins(admins: Employees) {
      Swal.fire({
        title: "Eliminar Empleado",
        html: `<a href="${admins.path_solicitud}" class="mt-4 inline-block text-blue-500 hover:underline">ver solicitud - ${admins.name}</a>`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteAdmins(admins.id)
        }
      });
    }
  
    deleteAdmins(id: number) {
      this.adminsService.deleteEmployes(id).subscribe({
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
