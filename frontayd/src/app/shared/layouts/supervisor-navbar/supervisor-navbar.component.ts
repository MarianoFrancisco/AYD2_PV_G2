import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-supervisor-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './supervisor-navbar.component.html',
  styleUrl: './supervisor-navbar.component.scss'
})
export class SupervisorNavbarComponent implements OnInit {
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
