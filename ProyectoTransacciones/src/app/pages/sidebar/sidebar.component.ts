import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import RolsService from '../../rols/rols.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export default class SidebarComponent implements OnInit {
  @Input() isVisible: boolean = false;
  userRole: string | null = null; // Propiedad para almacenar el rol del usuario

  constructor(private rolsService: RolsService) {}

  async ngOnInit() {
    try {
      this.userRole = await this.rolsService.getRol(); // Obtiene el rol del usuario
    } catch (error) {
      console.error('Error al obtener rol:', error);
    }
  }

  // Método para comprobar si el usuario es administrador
  isAdmin(): boolean {
    return this.userRole === 'Administrador';
  }

  isUser(): boolean{
    return this.userRole === 'Usuario';
  }
}
