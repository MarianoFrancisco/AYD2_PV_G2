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
  requests: EmployeeRequest[] = [];
  selectedEmployee: EmployeeRequest | null = null;
  employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      user_name: [''],
      name: [''],
      phone: [''],
      email: [''],
      gender: [''],
      estado_civil: [''],
      photo: [null],
    });
  }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests() {
    this.employeeService.getRequestsChangeInfo().subscribe({
      next: (res) => {
        this.requests = res.Solicitudes;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron obtener las solicitudes', 'error');
      },
    });
  }

  selectEmployee(employee: EmployeeRequest) {
    Swal.fire('Éxito', 'La informacion se presenta abajo de la tabla', 'success');
    this.selectedEmployee = employee;
    this.employeeForm.patchValue({
      user_name: employee.user_name,
      name: employee.name,
      phone: employee.phone,
      email: employee.email,
      gender: employee.gender,
      estado_civil: employee.estado_civil,
    });
  }

  submitForm() {
    if (!this.selectedEmployee) return;

    const formData = new FormData();
    Object.entries(this.employeeForm.value).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    this.employeeService.updateEmployeeInfo(formData).subscribe({
      next: (res) => {
        Swal.fire('Éxito', 'Información actualizada correctamente', 'success');
        this.fetchRequests();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar la información', 'error');
      },
    });
  }
}