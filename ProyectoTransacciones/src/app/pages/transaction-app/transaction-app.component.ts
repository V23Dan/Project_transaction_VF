import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import TableComponent from '../../table/table.component';
import { TransactionService } from '../../Transacciones/services/transaction.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-transaction-app',
  standalone: true,
  imports: [RouterModule, TableComponent, CommonModule, MatTableModule],
  templateUrl: './transaction-app.component.html',
  styles: ``,
})
export default class TransactionAppComponent {
  Alltransactions: any[] = [];
  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Tipo', field: 'typeTransaction' },
    { header: 'Cuenta Origen', field: 'fromAccount' },
    { header: 'Cuenta Destino', field: 'toAccount' },
    { header: 'Monto', field: 'amount' },
    { header: 'Estado', field: 'status' },
    { header: 'Fecha', field: 'createdAt' },
  ];
  constructor(private transactionService: TransactionService) {}

  async ngOnInit() {
    try {
      this.Alltransactions = await this.transactionService.getAllTransactions();
      this.loadTransactions();
    } catch (error) {
      console.error('Error al cargar transacciones: ', error);
    }
  }
  loadTransactions(): void {
    this.transactionService
      .getAllTransactions()
      .then((data) => {
        this.Alltransactions = data;
      })
      .catch((error) => {
        console.error('Error al obtener las transacciones', error);
      });
  }
}
