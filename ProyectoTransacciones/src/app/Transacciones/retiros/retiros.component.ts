import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../users/user.service';
import { AlertService } from '../../Alert/alert.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-retiros',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './retiros.component.html',
  styles: ``,
})
export default class RetirosComponent {
  private readonly fb = inject(FormBuilder);

  formGroupRetreat = this.fb.nonNullable.group({
    amount: [
      '',
      [Validators.required, Validators.max(1000000), Validators.min(20000)],
    ],
  });

  constructor(
    private transaction: TransactionService,
    private userService: UserService,
    private alertService: AlertService
  ) {}
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

  Retreat(): void {
    if (!this.formGroupRetreat.valid) {
      if (this.formGroupRetreat.controls['amount'].errors?.['required']) {
        this.alertService.showToast('Error en el monto', 'error');
      } else if (
        this.formGroupRetreat.controls['amount'].errors?.['max'] ||
        this.formGroupRetreat.controls['amount'].errors?.['min']
      ) {
        this.alertService.showToast(
          'El monto de la transferencia debe ser mayor a 20000 y menor a 1000000',
          'error'
        );
      }
    } else {
      this.transaction
        .Retreat(this.formGroupRetreat.value)
        .then((response) => {
          console.log('Retiro exitoso:', response);
          swal('Retiro exitoso', '', 'success');
        })
        .catch((error) => {
          console.error('Error al realizar el retiro:', error);
        });
    }
  }
}
