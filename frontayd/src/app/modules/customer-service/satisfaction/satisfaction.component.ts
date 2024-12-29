import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SatisfactionService } from '../../../services/satisfaction/satisfaction.service';
import { Satisfaction } from '../../../interfaces/satisfaction';
@Component({
  selector: 'app-satisfaction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './satisfaction.component.html',
  styleUrl: './satisfaction.component.scss'
})
export class SatisfactionComponent implements OnInit {

  questions: Satisfaction = {} as Satisfaction

  formData: any = {
    account_id: 0,
    category: '',
    score: 0,
    comment: '',
    responded_at: 1734843593,
  };

  constructor(private SatisfactionService: SatisfactionService){}

  ngOnInit(): void {
    this.SatisfactionService.getQuestions().subscribe({
      next: (data) => {
        this.questions = data
        Object.keys(this.questions).forEach(key => {
          this.formData[key] = '';
        });
      },
      error: (err) => {
        console.log("error", err)
      }
    });
  }


  sendSatisfaction() {
    if (this.validateFields()) {
      this.SatisfactionService.sendQuestions(this.formData).subscribe({
        next: (data) => {
          console.log(data)
          Swal.fire({
            icon: 'success',
            title: 'Encuesta realizada',
            text: 'La encuesta se realizó con exito'
          }).then(() => {
            window.location.reload();
          });
        },
        error: () =>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se puedo guardar la encuesta'
          });
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se han respondido todas las preguntas.'
      });
    }
  }

  validateFields(): boolean {
    for (let key of Object.keys(this.formData)) {
      if (this.formData[key] === '' || this.formData[key] === 0) {
        return false;
      }
    }
    return true
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  getName(key:string){
    switch(key.toLowerCase()){
      case 'question1':
        return 'answer1';
      case 'question2':
        return 'answer2';
      case 'question3':
        return 'answer3';
      case 'question4':
        return 'answer4';
      case 'question5':
        return 'answer5';
      default:
        return key;

    }
  }
}
