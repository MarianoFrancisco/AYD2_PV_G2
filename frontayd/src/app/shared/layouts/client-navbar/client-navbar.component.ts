import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './client-navbar.component.html',
  styleUrl: './client-navbar.component.scss'
})
export class ClientNavbarComponent implements OnInit{
  isSidebarOpen = false;
  companyName: string = ''; // Variable para almacenar el nombre de la empresa


  ngOnInit(): void {

  }


  logout() {

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
