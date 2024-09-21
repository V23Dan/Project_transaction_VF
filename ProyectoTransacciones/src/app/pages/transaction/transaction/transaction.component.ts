import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import TableComponent from '../../../table/table.component';
import { TransactionService } from '../../../Transacciones/services/transaction.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    RouterModule,
    TableComponent,
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './transaction.component.html',
  styles: ``,
})
export default class TransactionComponent implements OnInit {
  transactions: any[] = [];
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
      this.transactions = await this.transactionService.getTransactions();
      this.loadTransactions();
    } catch (error) {
      console.error('Error al cargar transacciones: ', error);
    }
  }
  loadTransactions(): void {
    this.transactionService
      .getTransactions()
      .then((data) => {
        this.transactions = data;
      })
      .catch((error) => {
        console.error('Error al obtener las transacciones', error);
      });
  }
}
