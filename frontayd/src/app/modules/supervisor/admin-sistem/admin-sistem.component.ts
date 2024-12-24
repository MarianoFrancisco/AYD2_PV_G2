import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Admins } from '../../../interfaces/admins';
import { AdminsService } from '../../../services/admins/admins.service';

@Component({
  selector: 'app-admin-sistem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sistem.component.html',
  styleUrl: './admin-sistem.component.scss'
})
export class AdminSistemComponent implements OnInit {
  data: Admins[] = []

  constructor(private adminsService: AdminsService) { }

  ngOnInit(): void {
    this.adminsService.getAllAdmins().subscribe({
      next: (data) => {
        this.data = data
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }

  async viewOnlyAdmins(data: Admins) {
    const { value: formValues } = await Swal.fire({
      icon: 'info',
      html: `
            <label for="swal-input1" class="swal2-label">Nombre:</label>
            <input id="swal-input1" type="text" class="swal2-input">
            <label for="swal-input2" class="swal2-label">User:</label>
            <input id="swal-input2" type="text" class="swal2-input">
            <label for="swal-input3" class="swal2-label">Correo:</label>
            <input id="swal-input3" type="email" class="swal2-input">
            <label for="swal-input4" class="swal2-label">Contraseña:</label>
            <input id="swal-input4" type="password" class="swal2-input">
            <label for="swal-input5" class="swal2-label">Teléfono:</label>
            <input id="swal-input5" type="text" class="swal2-input">
            <label for="swal-input6" class="swal2-label">Edad User:</label>
            <input id="swal-input6" type="text" class="swal2-input">
            <label for="swal-input7" class="swal2-label">Iden CUI:</label>
            <input id="swal-input7" type="text" class="swal2-input">
            <label for="swal-input8" class="swal2-label">Papeleria:</label>
            <input id="swal-input8" type="text" class="swal2-input">
            <label for="swal-input9" class="swal2-label">Foto:</label>
            <input id="swal-input9" type="text" class="swal2-input">
            <label for="swal-input10" class="swal2-label">Genero:</label>
            <input id="swal-input10" type="text" class="swal2-input">
            <label for="swal-input11" class="swal2-label">Marital:</label>
            <input id="swal-input11" type="text" class="swal2-input">
            <label for="swal-input2" class="swal2-label">Firma:</label>
            <input id="swal-input12" type="text" class="swal2-input">
          `,
      confirmButtonText: 'Aceptar',
      focusConfirm: false,
      didOpen: () => {
        // Puedes modificar los valores aquí si es necesario
        (document.getElementById('swal-input1') as HTMLInputElement).value = data.name;
        (document.getElementById('swal-input2') as HTMLInputElement).value = data.user_name;
        (document.getElementById('swal-input3') as HTMLInputElement).value = data.email;
        (document.getElementById('swal-input5') as HTMLInputElement).value = data.phone;
        (document.getElementById('swal-input6') as HTMLInputElement).value = String(data.age);
        (document.getElementById('swal-input7') as HTMLInputElement).value = data.dpi_number;
        (document.getElementById('swal-input8') as HTMLInputElement).value = data.complete_paperwork_path;
        (document.getElementById('swal-input9') as HTMLInputElement).value = data.photo_path;
        (document.getElementById('swal-input10') as HTMLInputElement).value = data.gender;
        (document.getElementById('swal-input11') as HTMLInputElement).value = data.marital_status;
        (document.getElementById('swal-input12') as HTMLInputElement).value = data.signature_path;
      },
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value ,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ];
      }
    });
  }

  deleteOnlyAdmins(admins: Admins) {
    Swal.fire({
      title: "Eliminar Administrador",
      html: `<p>¿ Seguro que deseas eliminar a ${admins.name} ?</p>`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteAdmins(admins.id)
      }
    });
  }

  deleteAdmins(id:number){
    this.adminsService.deleteUser(id).subscribe({
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
