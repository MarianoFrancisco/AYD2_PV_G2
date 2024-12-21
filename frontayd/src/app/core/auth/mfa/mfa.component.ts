import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioNavbarComponent } from "../../../shared/layouts/inicio-navbar/inicio-navbar.component";
@Component({
  selector: 'app-mfa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InicioNavbarComponent],
  templateUrl: './mfa.component.html',
  styleUrl: './mfa.component.scss'
})
export class MfaComponent {

}
