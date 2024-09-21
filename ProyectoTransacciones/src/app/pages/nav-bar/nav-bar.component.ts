import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import LoginService from '../../auth/services/loginService/login.service';
import SidebarComponent from '../sidebar/sidebar.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './nav-bar.component.html',
  styles: ``,
})
export default class NavBarComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  async onLogout() {
    try {
      await this.loginService.logoutUser();
      // Limpia cualquier estado de usuario en el frontend, como variables locales o almacenamiento local
      console.log('Logout exitoso');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
