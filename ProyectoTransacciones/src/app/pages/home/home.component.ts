import { Component, OnInit } from '@angular/core';
import { UserService } from '../../users/user.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styles: ``,
})
export default class HomeComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  userData: any;
  accountData: any;

  async ngOnInit() {
    try {
      this.userData = await this.userService.getUserData();
      this.accountData = await this.userService.getAccountData();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  transfer(): void {
    this.router.navigate(['/dashboard/transfer']);
  }

  deposit(): void {
    this.router.navigate(['/dashboard/deposit']);
  }

  retreat(): void {
    this.router.navigate(['/dashboard/retreat']);
  }
}
