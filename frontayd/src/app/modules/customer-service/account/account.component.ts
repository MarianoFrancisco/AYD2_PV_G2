import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewAccount } from '../../../interfaces/new-account';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NewAccountService } from '../../../services/newAccount/new-account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  data: NewAccount = {
    firstName : '',
    lastName :  '',
    cui :  '',
    phone : '',
    email :  '',
    age :  0,
    gender :  '',
    accountType :  '',
    securityQuestion :  '',
    securityAnswer :  '',
    amount : 0,
    photo64: '',
  }
  photo!: File;

  accountForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    cui: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    gender: new FormControl('', Validators.required),
    accountType: new FormControl('', Validators.required),
    securityQuestion: new FormControl('', Validators.required),
    securityAnswer: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required),
    photo64: new FormControl('', Validators.required),
  });

  constructor(private newAccountService: NewAccountService){}

  async createAccount(){
    const values = this.accountForm.value;
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(values.firstName != '' && values.lastName != '' && values.cui != '' && values.phone != '' && values.email != '' && values.gender != '' 
      && values.age != 0 && values.securityQuestion != '' && values.securityAnswer != '' && values.amount != 0 && values.photo64 != ''){
      const toBase64 = await this.toBase64();
      this.data.photo64 = toBase64;

      this.data.firstName = values.firstName || '';
      this.data.lastName = values.lastName || '';
      this.data.cui = values.cui || '';
      this.data.phone = values.phone || '';
      this.data.email = values.email || '';
      this.data.age = values.age || 0;
      this.data.gender = values.gender || '';
      this.data.accountType = values.accountType || '';
      this.data.securityQuestion = values.securityQuestion || '';
      this.data.securityAnswer = values.securityAnswer || '';
      this.data.amount = values.amount || 0;

      console.log(this.data)

      this.newAccountService.createAccount(this.data).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Cuenta Creada',
            text: 'La cuenta se ha creado correctamente'
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear la cuenta. Intente nuevamente.'
          });
        }
      })

        

    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No has ingresado todos los datos.'
      });
      return;
    }

  }

  toBase64(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result?.toString() || "");
      };
      reader.onerror = reject;
      reader.readAsDataURL(this.photo);
    });
  }

  getFile(event: any){
    this.photo = event.target.files[0];
  }

}
