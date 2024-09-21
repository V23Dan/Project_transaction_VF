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
import { CommonModule } from '@angular/common';
import { AlertService } from '../../Alert/alert.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-transferencias',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './transferencias.component.html',
  styles: ``,
})
export default class TransferenciasComponent {
  private readonly fb = inject(FormBuilder);

  formGroupTransfer = this.fb.nonNullable.group({
    toAccount: ['', [Validators.required, Validators.maxLength(30)]],
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
  Transfer(): void {
    if (!this.formGroupTransfer.valid) {
      if (this.formGroupTransfer.controls.toAccount.errors) {
        this.alertService.showToast('Error en la cuenta destinataria', 'error');
      } else if (
        this.formGroupTransfer.controls['amount'].errors?.['required']
      ) {
        this.alertService.showToast(
          'Error en el monto',
          'error'
        );
      } else if (
        this.formGroupTransfer.controls['amount'].errors?.['max'] ||
        this.formGroupTransfer.controls['amount'].errors?.['min']
      ) {
        this.alertService.showToast(
          'El monto de la transferencia debe ser mayor a 20000 y menor a 1000000',
          'error'
        );
      }
    } else {
      this.transaction
        .transfer(this.formGroupTransfer.value)
        .then((response) => {
          console.log('Transferencia exitosa:', response);
          swal('Transferencia exitosa', '', 'success');
        })
        .catch((error) => {
          console.error('Error al realizar la transferencia:', error);
        });
    }
  }
}
