import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ComplaintsService } from '../../../services/complaints-register/complaints.service';
import { ComplaintsRegister } from '../../../interfaces/complaints-register';

@Component({
  selector: 'app-complaints-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './complaints-register.component.html',
  styleUrl: './complaints-register.component.scss'
})
export class ComplaintsRegisterComponent {

  data: ComplaintsRegister = {
    identificacion: '',
    tipoQueja: '',
    detalle: ''
  }

  complaintsForm = new FormGroup({
    identificacion: new FormControl('', Validators.required),
    tipoQueja: new FormControl('', Validators.required),
    detalle: new FormControl('', Validators.required),
  });

  constructor(private ComplaintsService: ComplaintsService) { }

  enviarQueja() {
    const value = this.complaintsForm.value

    if (value.identificacion != '' && value.tipoQueja != '' && value.detalle != '') {
      this.data.identificacion = value.identificacion || '';
      this.data.tipoQueja = value.tipoQueja || '';
      this.data.detalle = value.detalle || '';
      
      this.ComplaintsService.registerComplaints(this.data).subscribe({
        next: (data) => {
          this.limpiarForm()
          Swal.fire({
            icon: 'success',
            title: 'Registro de Queja',
            text: `Queja registrada exitosamente`
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error.error.error}`
          });
          return
        }
      });


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No has ingresado todos los datos'
      });
    }
  }

  limpiarForm(){
    this.complaintsForm.patchValue({
      identificacion: '',
      tipoQueja: '',
      detalle: ''
    })
  }

}
