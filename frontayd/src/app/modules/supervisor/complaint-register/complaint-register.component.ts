import { Component, OnInit } from '@angular/core';
import { Complaint } from '../../../interfaces/complaint';
import { ComplaintService } from '../../services/complaint.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-complaint-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaint-register.component.html',
  styleUrl: './complaint-register.component.scss'
})
export class ComplaintRegisterComponent implements OnInit {
  complaints: Complaint[] = []; // Lista de quejas

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.loadComplaints(); // Cargar las quejas cuando se inicializa el componente
  }

  // Método para cargar las quejas desde el servicio
  loadComplaints(): void {
    this.complaintService.getComplaints().subscribe({
      next: (data) => {
        this.complaints = data; // Asignar la respuesta a la variable complaints
      },
      error: (err) => {
        console.error('Error al obtener las quejas:', err); // Manejar el error
      }
    });
  }

  // Método para ver los detalles de una queja
  viewDetails(id: number): void {
    const complaint = this.complaints.find((complaint) => complaint.id === id);
    if (complaint) {
      Swal.fire({
        title: `Detalles de la Queja #${complaint.id}`,
        html: `
          <strong>Categoría:</strong> ${complaint.category}<br>
          <strong>Detalles:</strong> ${complaint.details}<br>
          <strong>Nombre:</strong> ${complaint.name} ${complaint.last_name}<br>
          <strong>Correo:</strong> ${complaint.email}<br>
          <strong>Teléfono:</strong> ${complaint.phone}<br>
          <strong>Edad:</strong> ${complaint.age}
        `,
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}