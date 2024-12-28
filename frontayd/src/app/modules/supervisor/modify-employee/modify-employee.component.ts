import { Component, OnInit } from '@angular/core';
import { EmployeeRequest } from '../../../interfaces/Employee';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/EmployeeService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modify-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modify-employee.component.html',
  styleUrl: './modify-employee.component.scss'
})
export class ModifyEmployeeComponent implements OnInit {
  employeeRequests: EmployeeRequest[] = [];
  selectedEmployee: EmployeeRequest | null = null;
  employeeForm: FormGroup;
  currentPhotoPath: string | null = null;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: [''],
      user_name: [''],
      phone: [''],
      email: [''],
      gender: [''],
      estado_civil: [''],
      photo: [null],
    });
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.employeeService.getRequests().subscribe(
      (response) => {
        const uniqueRequests = response.Solicitudes.filter((request, index, self) =>
          index === self.findIndex((t) => t.id === request.id)
        );
        this.employeeRequests = uniqueRequests;
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }
  
  selectEmployee(employee: EmployeeRequest): void {
    
    this.selectedEmployee = employee;
    this.currentPhotoPath = employee.photo_path || null;
    Swal.fire({
      icon: 'info',
      title: 'Información',
      html: '<p>La información se generó abajo</p><br><i style="font-size: 24px;">&#x2193;</i>', // Flecha hacia abajo en HTML
      confirmButtonText: 'Entendido'
  });
  
    this.employeeForm.patchValue({
      name: employee.name,
      user_name: employee.user_name,
      phone: employee.phone,
      email: employee.email,
      gender: employee.gender,
      estado_civil: employee.marital_status,
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.employeeForm.patchValue({ photo: file });
    }
  }

  submitUpdate(): void {
    if (!this.selectedEmployee) return;
  
    const formData = new FormData();
  
    // Añadir todos los campos del formulario
    Object.keys(this.employeeForm.value).forEach((key) => {
      if (key === 'photo' && this.employeeForm.value.photo) {
        // Si hay una nueva foto se manda por el formdata
        formData.append(key, this.employeeForm.value.photo);
      } else if (key !== 'photo') {
        // Ya vi el porque
        formData.append(key, this.employeeForm.value[key]);
      }
    });
  
    // Al no ser un tipo FILE no va a dejar validarlo
    if (!this.employeeForm.value.photo && this.currentPhotoPath) {
      formData.append('photo_path', this.currentPhotoPath);
    }
  
    this.employeeService.updateEmployeeInfo(formData).subscribe(
      (response) => {
        Swal.fire('Éxito', response.message, 'success');
        this.loadRequests();
        this.selectedEmployee = null;
        this.currentPhotoPath = null;
        this.employeeForm.reset();
      },
      (error) => {
        console.error('Error updating employee info:', error);
        Swal.fire('Error', 'Hubo un error en el proceso', 'error');
      }
    );
  }   
}