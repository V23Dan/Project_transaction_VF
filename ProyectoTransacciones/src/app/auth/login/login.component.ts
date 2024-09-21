import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import swal from 'sweetalert';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import LoginService from '../services/loginService/login.service';
import { AlertService } from '../../Alert/alert.service';
import * as CryptoJS from 'crypto-js';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export default class LoginComponent {
  private readonly fb = inject(FormBuilder);

  formGroupLogin = this.fb.nonNullable.group({
    documento: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    pass: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
    ],
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertService: AlertService
  ) {}

  clickLogin(): void {
    const campos = [
      { control: 'documento', mensaje: 'Error en el campo documento' },
      { control: 'pass', mensaje: 'Error en el campo contraseña' },
    ];
    for (const campo of campos) {
      if (
        (this.formGroupLogin.controls as { [key: string]: AbstractControl })[
          campo.control
        ].errors
      ) {
        this.alertService.showToast(campo.mensaje, 'error');
        return; // Sale después de mostrar el primer error encontrado
      }
    }
    const password = this.formGroupLogin.value.pass || '';
    const encryptedPass = CryptoJS.SHA256(password).toString();

    const formDataLogin = {
      ...this.formGroupLogin.value,
      pass: encryptedPass,
    };
    this.loginService.loginUser(formDataLogin).then((response) => {
      if (!response) {
        swal('Error', 'Error al iniciar sesion', 'error');
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
