import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {
  isSidebarOpen = false;
  companyName: string = ''; // Variable para almacenar el nombre de la empresa



  logout() {

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
