import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Admins, Employees } from '../../../interfaces/admins';
import { SupervisorsService } from '../../../services/supervisor/supervisors.service';

@Component({
  selector: 'app-delete-employe',
  standalone: true,
  imports: [],
  templateUrl: './delete-employe.component.html',
  styleUrl: './delete-employe.component.scss'
})
export class DeleteEmployeComponent implements OnInit  {

  data: Admins[] = []
  employee: Employees = {
    "id_admin": 0,
    "id_user": 0,
    "reason": "",
    "created_at": 0
  }

  constructor(private supervisorServices: SupervisorsService) { }

  ngOnInit(): void {
    this.supervisorServices.getAllEmployeesActive().subscribe({
      next: (data) => {
        this.data = data
        console.log()
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }

  deleteOnlyAdmins(admins: Admins) {
    Swal.fire({
      title: "Eliminar Empleado",
      html: `
                  <p class="mb-0 text-start">Escribe una razón por la que se eliminará el empleado</p><br>
                  <p class="mb-0 text-start">Empleado a eliminar: <strong>${admins.name}</strong></p><br>
                  <input type="text" id="reasonDelete" name="reasonDelete class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Motivo"">
                `,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      preConfirm: () => {
        const reason = (document.getElementById('reasonDelete') as HTMLInputElement);
        if (reason.value == '') {
          Swal.showValidationMessage(`Debes ingresar un motivo`);
        }
        return reason.value
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.employee.id_admin = user.id
        this.employee.id_user = admins.id
        this.employee.reason = result.value
        this.employee.created_at = admins.created_at
        console.log(this.employee)
      }
    });
  }

  deleteAdmins() {
    this.supervisorServices.deleteEmployes(this.employee).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminar Empleado',
          text: `${data.message}`
        });
      },
      error: (err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Eliminar Empleado',
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
