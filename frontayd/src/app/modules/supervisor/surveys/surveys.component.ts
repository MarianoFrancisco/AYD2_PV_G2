import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Surveys } from '../../../interfaces/surveys';
import { SurveysService } from '../../../services/surveys/surveys.service';

@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss'
})
export class SurveysComponent implements OnInit {

  data: Surveys[] = []

  constructor(private surveyService: SurveysService){}

  ngOnInit(): void {
    this.surveyService.getAllSurveys().subscribe({
      next: (data) =>{
        this.data = data
      },
      error: () => {
        console.log("error al obtener registros")
      }
    })
  }

  viewOnlySurveys(data: Surveys) {
    Swal.fire({
      icon: 'info',
      html: `
            <strong>${data.Question1}</strong><br> ${data.Answer1}<br>
            <strong>${data.Question2}</strong><br> ${data.Answer2}<br>
            <strong>${data.Question3}</strong><br> ${data.Answer3}<br>
            <strong>${data.Question4}</strong><br> ${data.Answer4}<br>
            <strong>${data.Question4}</strong><br> ${data.Answer5}<br>
          `,
      confirmButtonText: 'Aceptar'
          });
  }

  convertirFecha(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();  
  }

}
