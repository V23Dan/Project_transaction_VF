import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../auth/services/registerService/register.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';
import swal from 'sweetalert';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styles: ``,
})
export default class AddUserComponent {
  @Output() closeModal = new EventEmitter<void>();
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z]*$'),
        ],
      ],
      documento: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      edad: [
        null,
        [
          Validators.required,
          Validators.min(18),
          Validators.max(100),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      sexo: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.maxLength(60)]],
      correo: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
      rol: ['', Validators.required], // Rol con valor predeterminado 'Usuario'
    });
  }

  async registerUser() {
    const password = this.registrationForm.value.pass || '';
    const encryptedPass = CryptoJS.SHA256(password).toString();

    if (this.registrationForm.valid) {
      const formData = { ...this.registrationForm.value, pass: encryptedPass };
      try {
        this.registerService.AdminRegisterUser(formData).then((response) => {
          if (!response) {
            swal('Error', 'Error de registro', 'error');
          } else {
            swal('¡Registrado!', '', 'success');
            this.router.navigate(['/dashboard/users']);
          }
        });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario');
      }
    } else {
      swal('Error', 'Fromulario invalido', 'error');
    }
  }
}
