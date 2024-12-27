import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Admins } from '../../../interfaces/admins';
import { SupervisorsService } from '../../../services/supervisor/supervisors.service';


@Component({
  selector: 'app-delete-employe',
  standalone: true,
  imports: [],
  templateUrl: './delete-employe.component.html',
  styleUrl: './delete-employe.component.scss'
})
export class DeleteEmployeComponent implements OnInit {

  data: Admins[] = []
  base64: string = ""

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

  deleteOnlyAdmins(admins: Admins) {
    Swal.fire({
      title: "Eliminar Empleado",
      html: `
                  <p class="mb-0 text-start">Carga un archivo PDF con el motivo de su eliminación</p><br>
                  <p class="mb-0 text-start">Empleado a eliminar: <strong>${admins.name}</strong></p><br>
                  <input type="file" id="fileDelete" name="fileDelete">
                `,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      preConfirm: () => {
        const file = (document.getElementById('fileDelete') as HTMLInputElement);
        if (file.files?.length == 0) {
          Swal.showValidationMessage(`Debes seleccionar un archivo`);
        }
        return file.files
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const pdFile = result.value[0]
        this.base64 = await this.toBase64(pdFile)
        this.deleteAdmins(admins.id)
      }
    });
  }

  deleteAdmins(id: number) {
    this.supervisorServices.deleteEmployes(id).subscribe({
      next: (data) => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Eliminar Empleado',
          text: `Solicitud enviada correctamente`
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



  toBase64(pdf: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result?.toString() || "");
      };
      reader.onerror = reject;
      reader.readAsDataURL(pdf);
    });
  }

  convertirFecha(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

}
