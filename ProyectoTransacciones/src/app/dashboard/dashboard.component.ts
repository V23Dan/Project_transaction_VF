import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import NavBarComponent from '../pages/nav-bar/nav-bar.component';
import SidebarComponent from '../pages/sidebar/sidebar.component';
import HomeComponent from '../pages/home/home.component';
import RolsService from '../rols/rols.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NavBarComponent, SidebarComponent, HomeComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export default class DashboardComponent implements OnInit {
  userRole: string | null = null;
  constructor(private router: Router, private rolsService: RolsService) {
    // Deshabilitar la caché del navegador para este componente
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
      this.router.navigate(['/login']);
    };
  }

  async ngOnInit() {
    this.userRole = await this.rolsService.getRol();
    if (this.userRole === 'Administrador') {
      this.router.navigate(['/dashboard/users']);
    } else {
      this.router.navigate(['/dashboard/home']);
    }
  }
}
