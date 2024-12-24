import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.scss'
})
export class CustomerNavbarComponent implements OnInit {
  isSidebarOpen = false;
  companyName: string = '';


  ngOnInit(): void {

  }


  logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
