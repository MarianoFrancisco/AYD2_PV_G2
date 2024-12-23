import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AccountService } from '../../../services/account/account.service';
import { AccountDetail, Transactions } from '../../../interfaces/account';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {
  AccountDetail: AccountDetail | undefined;
  securityQuestion: string | undefined; // Para almacenar la pregunta secreta
  securityAnswer: string = ''; // Respuesta del usuario
  selectedFile: File | undefined;
  busquedaForm: FormGroup;

  constructor(private accountServices: AccountService, private fb: FormBuilder) {
    this.busquedaForm = this.fb.group({
      tipoBusqueda: ['account_number'],
    });
  }

  accountForm = new FormGroup({
    tipoBusqueda: new FormControl('', Validators.required),
    codigoBusqueda: new FormControl('', Validators.required),
  });

  buscar() {

    const values = this.accountForm.value;
    const tipo = values.tipoBusqueda;
    const codigo = values.codigoBusqueda;

    if (!tipo || !codigo) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Vacíos',
        text: 'Por favor, complete todos los campos antes de realizar la búsqueda.',
      });
      return;
    }

    if (tipo === 'account_number') {
      this.accountServices.getAccountByNumber(codigo).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Encontrado',
            text: 'Datos del usuario encontrados.',
          });
          this.AccountDetail = data.client;

          // Cargar la fotografía
          this.accountServices.getUserPhoto(data.client.account_number).subscribe({
            next: (photoData) => {
              this.AccountDetail!.photoPath = photoData.photo_path;
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar la fotografía del usuario.',
              });
            },
          });

          // Obtener la pregunta secreta
          this.accountServices.getSecurityQuestion(data.client.account_number).subscribe({
            next: (questionData) => {
              this.securityQuestion = questionData.security_question;
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo obtener la pregunta secreta.',
              });
            },
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Cuenta no encontrada. Intente nuevamente.',
          });
        },
      });
    } else if (tipo === 'cui') {
      // Lógica para buscar por CUI
    }
  } 

  limpiarCampos() {
    this.accountForm.reset();
    this.AccountDetail = undefined;
    this.securityQuestion = undefined;
    this.securityAnswer = '';
  }

  guardarCambiosN(conImagen: boolean, archivo?: File) {
    if (!this.AccountDetail || !this.securityAnswer) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Vacíos',
        text: 'Complete todos los campos antes de guardar.',
      });
      return;
    }
  
    const payload = {
      account_number: this.AccountDetail.account_number,
      security_answer: this.securityAnswer,
      updates: {
        email: this.AccountDetail.email,
        phone: this.AccountDetail.phone,
      },
    };
  
    if (conImagen && archivo) {
      const formData = new FormData();
      formData.append('account_number', this.AccountDetail.account_number);
      formData.append('security_answer', this.securityAnswer);
      formData.append('updates[email]', this.AccountDetail.email);
      formData.append('updates[phone]', this.AccountDetail.phone);
      formData.append('photo', archivo);
  
      this.accountServices.updateAccountWithImage(formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Los datos y la imagen se actualizaron correctamente.',
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron actualizar los datos.',
          });
        },
      });
    } else {
      this.accountServices.updateAccountWithoutImage(payload).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Los datos se actualizaron correctamente.',
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron actualizar los datos.',
          });
        },
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = undefined;
    }
  }
  
  guardarCambios() {
    if (!this.AccountDetail || !this.securityAnswer) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Vacíos',
        text: 'Complete todos los campos antes de guardar.',
      });
      return;
    }
  
    const payload = {
      account_number: this.AccountDetail.account_number,
      security_answer: this.securityAnswer,
      updates: {
        email: this.AccountDetail.email,
        phone: this.AccountDetail.phone,
      },
    };
  
    if (this.selectedFile) {
      // Si se seleccionó una imagen, se envía junto con los datos
      const formData = new FormData();
      formData.append('account_number', this.AccountDetail.account_number);
      formData.append('security_answer', this.securityAnswer);
      formData.append('updates[email]', this.AccountDetail.email);
      formData.append('updates[phone]', this.AccountDetail.phone);
      formData.append('photo', this.selectedFile);
  
      this.accountServices.updateAccountWithImage(formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Los datos se actualizaron correctamente.',
          }).then(() => {
            window.location.reload();
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron actualizar los datos.',
          });
        },
      });
    } else {
      // Si no hay imagen seleccionada, se envían solo los datos
      this.accountServices.updateAccountWithoutImage(payload).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Los datos se actualizaron correctamente.',
          }).then(() => {
            window.location.reload();
          });
        },        
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron actualizar los datos.',
          });
        },
      });
    }
  }
  
}
