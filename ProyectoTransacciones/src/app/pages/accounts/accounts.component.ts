import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import TableComponent from '../../table/table.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AccountsService } from '../../accounts/accounts.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [RouterModule, TableComponent, CommonModule, MatTableModule],
  templateUrl: './accounts.component.html',
  styles: ``,
})
export default class AccountsComponent {
  AllAccounts: any[] = [];
  columns = [
    { header: 'Numero de cuenta', field: 'accountNumber' },
    { header: 'Documento', field: 'documento' },
    { header: 'Balance', field: 'balance' },
    { header: 'Fecha de creacion', field: 'createdAt' },
  ];

  constructor(private accountService: AccountsService) {}

  async ngOnInit() {
    try {
      this.AllAccounts = await this.accountService.getAllAccounts();
      this.loadTransactions();
    } catch (error) {
      console.error('Error al cargar transacciones: ', error);
    }
  }
  loadTransactions(): void {
    this.accountService
      .getAllAccounts()
      .then((data) => {
        this.AllAccounts = data;
      })
      .catch((error) => {
        console.error('Error al obtener las transacciones', error);
      });
  }
}
