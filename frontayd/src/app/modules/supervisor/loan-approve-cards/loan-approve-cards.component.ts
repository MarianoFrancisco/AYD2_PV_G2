import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Tarjetas } from '../../../interfaces/aprobaciones';
import { SupervisorsService } from '../../../services/supervisor/supervisors.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-approve-cards',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loan-approve-cards.component.html',
  styleUrl: './loan-approve-cards.component.scss'
})
export class LoanApproveCardsComponent implements OnInit {
  data: Tarjetas[] = []
  searchFilter: string = '';

  constructor(private supervisorServices: SupervisorsService) { }

  ngOnInit(): void {
    this.supervisorServices.getSolicitudCards().subscribe({
      next: (data) => {
        this.data = data
        console.log()
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }

  validateLoans(tarjeta: Tarjetas) {
    Swal.fire({
      title: "Solicitud de Prestamo",
      html: `
                <p class="mb-0 text-center">Datos del Solicitante</p><br>
                <p class="mb-0 text-start"><strong> Nombre:</strong> ${tarjeta.accountDetails.name} ${tarjeta.accountDetails.last_name}</p><br>
                <p class="mb-0 text-start"><strong> CUI:</strong> ${tarjeta.accountDetails.cui}</p><br>
                <p class="mb-0 text-start"><strong> Teléfono:</strong> ${tarjeta.accountDetails.phone}</p><br>
                <p class="mb-0 text-start"><strong> Correo:</strong> ${tarjeta.accountDetails.email}</p><br>
              `,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Aprobar",
      denyButtonText: "Rechazar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.validate("Activa", tarjeta.id)
      }
      if (result.isDenied) {
        this.validate("Rechazada", tarjeta.id)
      }
    });
  }

  validate(estado: string, id: number) {
    this.supervisorServices.updateSolicitudCards({ status: estado }, id).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud de Tarjetas',
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

  filtered(){
    if(this.searchFilter === ''){
      return this.data
    }else{
      return this.data.filter((data) => data.status === this.searchFilter)
    }
  }

  convertirFecha(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

}
