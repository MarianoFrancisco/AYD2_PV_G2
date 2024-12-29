import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SupervisorsService } from '../../../services/supervisor/supervisors.service';
import { Admins } from '../../../interfaces/admins';
import { ViewServicesCancel } from '../../../interfaces/cancelServices';

@Component({
  selector: 'app-cancellation-service',
  standalone: true,
  imports: [],
  templateUrl: './cancellation-service.component.html',
  styleUrl: './cancellation-service.component.scss'
})
export class CancellationServiceComponent implements OnInit {
  data: ViewServicesCancel[] = []

  constructor(private supervisorServices: SupervisorsService) { }

  ngOnInit(): void {
    this.supervisorServices.getSolicitudCancelService().subscribe({
      next: (data) => {
        this.data = data
        console.log()
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }

  validateCancel(solicitud: ViewServicesCancel) {
    this.supervisorServices.aprobeCancelService({service_cancellation_id: solicitud.id, account_id:solicitud.account_id}).subscribe({
      next: (data) => {
        console.log(data)
        Swal.fire({
          icon: (data.message.toLowerCase().includes('rechazada'))?'error':'success',
          title: 'Cancelación de Servicio',
          text: `${data.message}`
        });
      },
      error: (err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Cancelación de Servicio',
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
