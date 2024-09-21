import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../users/user.service';
import RolsService from '../../rols/rols.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user.component.html',
  styles: ``,
})
export default class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private rolService: RolsService
  ) {}
  userData: any;
  accountData: any;
  rolUser: any;

  async ngOnInit() {
    try {
      this.rolUser = await this.rolService.getRol();
      if (this.rolUser === 'Usuario') {
        this.accountData = await this.userService.getAccountData();
      }
      this.userData = await this.userService.getUserData();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  isUser(): boolean {
    if (this.rolUser === 'Usuario') {
      return true;
    } else {
      return false;
    }
  }
}
