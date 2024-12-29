import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CancelServices } from '../../../interfaces/cancelServices';
import Swal from 'sweetalert2';
import { CancelServicesService } from '../../../services/cancelServices/cancel-services.service';

@Component({
  selector: 'app-cancelservices',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cancelservices.component.html',
  styleUrl: './cancelservices.component.scss'
})
export class CancelservicesComponent {

  constructor(private cancerlServices: CancelServicesService) { }

  data: CancelServices = {
    account_id: '',
    reason: '',
    service: ''
  }

  serviceForm = new FormGroup({
    account_id: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
  });

  cancelService() {
    const values = this.serviceForm.value;

    if (values.account_id != '' && values.reason != '' && values.service != '') {
      this.cancerlServices.createCancelService(this.data).subscribe({
        next: (data) => {
          console.log(data)
          this.limpiarForm()
          Swal.fire({
            icon: 'success',
            title: 'Cancelación de Servicio',
            text: 'Solicitud de cancelación creada con exito.'
          });
        },
        error: (error) => {
          this.limpiarForm()
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha podido crear la solicitud, intentalo de nuevo.'
          });
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No has ingresado todos los datos.'
      });
    }

  }

  limpiarForm() {
    this.serviceForm.patchValue({
      account_id: '',
      service: '',
      reason: '',
    })
  }

}
