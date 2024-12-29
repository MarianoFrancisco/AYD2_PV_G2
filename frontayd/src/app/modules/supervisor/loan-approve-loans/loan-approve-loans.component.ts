import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Prestamos } from '../../../interfaces/aprobaciones';
import { SupervisorsService } from '../../../services/supervisor/supervisors.service';

@Component({
  selector: 'app-loan-approve-loans',
  standalone: true,
  imports: [],
  templateUrl: './loan-approve-loans.component.html',
  styleUrl: './loan-approve-loans.component.scss'
})
export class LoanApproveLoansComponent implements OnInit {
  data: Prestamos[] = []

  constructor(private supervisorServices: SupervisorsService) { }

  ngOnInit(): void {
    this.supervisorServices.getSolicitudLoans().subscribe({
      next: (data) => {
        this.data = data
        console.log()
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }

  validateLoans(prestamo: Prestamos) {
    Swal.fire({
      title: "Solicitud de Prestamo",
      html: `
              <p class="mb-0 text-center">Datos del Solicitante</p><br>
              <p class="mb-0 text-start"><strong> Nombre:</strong> ${prestamo.account.name} ${prestamo.account.last_name}</p><br>
              <p class="mb-0 text-start"><strong> Teléfono:</strong> ${prestamo.account.phone}</p><br>
              <p class="mb-0 text-start"><strong> Correo:</strong> ${prestamo.account.email}</p><br>
              <p class="mb-0 text-start"><strong> Documentación:</strong><a href="${prestamo.documentation_path}" target="_blank">Ver Documentación</a></p><br>
            `,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Aprobar",
      denyButtonText: "Rechazar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.validate("Aprobada", prestamo.id)
      }
      if (result.isDenied) {
        this.validate("Rechazada", prestamo.id)
      }
    });
  }

  validate(estado: string, id: number) {
    this.supervisorServices.updateSolicitudLoans({ status: estado }, id).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud de Prestamos',
          text: `${data.message}`
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Solicitud de Prestamos',
          text: `${err}`
        });
      }
    })
  }


  convertirFecha(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }
}
