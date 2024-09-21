import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styles: ``,
})
export default class AuthComponent {}
