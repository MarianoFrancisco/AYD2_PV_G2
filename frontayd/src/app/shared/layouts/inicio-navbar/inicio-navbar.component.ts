import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-inicio-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio-navbar.component.html',
  styleUrl: './inicio-navbar.component.scss'
})
export class InicioNavbarComponent {
  // Control del menú de navegación
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  clearIdentifier(): void {
    localStorage.removeItem('identifier');
    localStorage.removeItem('user');
  }
}
