import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminsService } from '../../../services/admins/admins.service';
import { Admins, EliminaList } from '../../../interfaces/admins';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-delete-employe',
  standalone: true,
  imports: [],
  templateUrl: './delete-employe.component.html',
  styleUrl: './delete-employe.component.scss'
})
export class DeleteEmployeComponent implements OnInit {

  data: EliminaList[] = []

  constructor(private adminsService: AdminsService) { }

  ngOnInit(): void {
    this.adminsService.getAllEmployesDeleteList().subscribe({
      next: (data) => {
        this.data = data
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }

  viewDetails(employe: EliminaList) {
    const doc = new jsPDF();
    const signatureUrl = employe.signature_admin;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text('Solicitud de Eliminación de Empleado', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Solicitado Por: ', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(`${employe.name_adm}`, 50, 40);

    doc.setFont('helvetica', 'bold');
    doc.text('Telefono: ', 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`${employe.phone_adm}`, 50, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('Correo:', 90, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`${employe.email_adm}`, 110, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('ID de Usuario a Eliminar:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`${employe.id_user}`, 80, 60);

    doc.setFont('helvetica', 'bold');
    doc.text('Razón: ', 20,70);
    doc.setFont('helvetica', 'normal');
    doc.text(`${employe.reason}`, 20, 80);

    doc.setFont('helvetica', 'bold');
    doc.text('Firma Administrador:', 20, 90);

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = signatureUrl;

    image.onload = () => {
      doc.addImage(image, 'PNG', 20, 100, 50, 30);
      doc.save(`Solicitud_${employe.id_user}.pdf`);
    };

    image.onerror = () => {
      Swal.fire('Error', 'Error al obtener pdf', 'error');
    };
  }

  deleteOnlyAdmins(id: number) {
    Swal.fire({
      title: "Eliminar Empleado",
      html: `<p class="text-start">seguro que desea eliminar el empleado con ID - ${id}</a>`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAdmins(id)
      }
    });
  }

  deleteAdmins(id: number) {
    this.adminsService.deleteEmployes({ id_user: id }).subscribe({
      next: (data) => {
        console.log(data)
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
