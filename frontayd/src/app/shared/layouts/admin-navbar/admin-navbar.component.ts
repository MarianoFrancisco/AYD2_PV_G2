import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent implements OnInit{
  isSidebarOpen = false;
  companyName: string = '';


  ngOnInit(): void {

  }


  logout() {

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
