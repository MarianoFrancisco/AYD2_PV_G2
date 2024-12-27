import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SupervisorsService } from '../../../services/supervisor/supervisors.service';
import { Admins } from '../../../interfaces/admins';

@Component({
  selector: 'app-cancellation-service',
  standalone: true,
  imports: [],
  templateUrl: './cancellation-service.component.html',
  styleUrl: './cancellation-service.component.scss'
})
export class CancellationServiceComponent implements OnInit {
  data: Admins[] = []

  constructor(private supervisorServices:SupervisorsService){}

  ngOnInit(): void {
    this.supervisorServices.getSolicitudCancelService().subscribe({
      next: (data) => {
        this.data = data.empleados
        console.log()
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }
}
