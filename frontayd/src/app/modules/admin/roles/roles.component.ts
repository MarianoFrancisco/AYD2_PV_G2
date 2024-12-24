import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserRoleService } from '../../services/user-role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  userRoles: { [id: number]: string } = {};
  
  nameFilter: string = '';
  roleFilter: string = '';

  constructor(private userRoleService: UserRoleService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userRoleService.getUsers().subscribe({
      next: (response) => {
        this.users = response.user.filter(user => 
          user.role === 'Cajero' || user.role === 'Atención al Cliente'
        );

        this.filteredUsers = this.users;
        this.filteredUsers.forEach((user) => {
          this.userRoles[user.id] = user.role;
        });
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  filterUsers(): void {
    let filteredByRole = this.users.filter((user) => {
      const matchesRole = this.roleFilter ? user.role === this.roleFilter : true;
      return matchesRole;
    });

    if (this.nameFilter.trim()) {
      this.filteredUsers = filteredByRole.filter((user) =>
        user.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      );
    } else {
      this.filteredUsers = filteredByRole;
    }
  }

  updateRole(user: User): void {
    const newRole = this.userRoles[user.id];
  
    if (newRole && newRole !== user.role) {
      this.userRoleService.updateUserRole(user.id, newRole).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Rol actualizado',
            text: `${response.message}`,
            confirmButtonText: 'Aceptar',
          });
          user.role = newRole;
        },
        error: (err) => {
          console.error('Error al actualizar rol:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el rol.',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Rol sin cambios',
        text: 'El rol seleccionado es igual al actual.',
        confirmButtonText: 'Aceptar',
      });
    }
  }  
}