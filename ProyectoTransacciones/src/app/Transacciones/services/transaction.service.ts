import { Injectable } from '@angular/core';
import axios from 'axios';
import LoginService from '../../auth/services/loginService/login.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly transferUrl = 'http://localhost:3000/transfer/transfer';
  constructor(private loginService: LoginService, private router: Router) {}

  async transfer(DataTransfer: any): Promise<any> {
    try {
      const response = await axios.post(this.transferUrl, DataTransfer, {
        withCredentials: true,
      });
      this.router.navigate(['/dashboard/home']);
      return response.data;
    } catch (error) {
      console.log('Error de transferencias: ', error);
      swal('Transferencia fallida', '', 'error');
      throw error; // Lanza el error para manejarlo adecuadamente
    }
  }

  private readonly DepositUrl = 'http://localhost:3000/transfer/deposit';

  async Deposit(DataDeposit: any): Promise<any> {
    try {
      const response = await axios.post(this.DepositUrl, DataDeposit, {
        withCredentials: true,
      });
      this.router.navigate(['/dashboard/home']);
      return response.data;
    } catch (error) {
      console.log('Error de deposito: ', error);
      swal('Deposito fallido', '', 'error');
      throw error; // Lanza el error para manejarlo adecuadamente
    }
  }

  private readonly RetreatUrl = 'http://localhost:3000/transfer/retreat';
  async Retreat(DataRetreat: any): Promise<any> {
    try {
      const response = await axios.post(this.RetreatUrl, DataRetreat, {
        withCredentials: true,
      });
      this.router.navigate(['/dashboard/home']);
      return response.data;
    } catch (error) {
      console.log('Error de retiro: ', error);
      swal('Retiro fallido', '', 'error');
      throw error; // Lanza el error para manejarlo adecuadamente
    }
  }

  private readonly transactionsUrl = 'http://localhost:3000/transfer/getTransactions';

  async getTransactions(): Promise<any> {
    try {
      const response = await axios.get(this.transactionsUrl, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener transacciones: ', error);
      throw error;
    }
  }

  private readonly AlltransactionsUrl = 'http://localhost:3000/transfer/getAllTransactions';

  async getAllTransactions(): Promise<any> {
    try {
      const response = await axios.get(this.AlltransactionsUrl, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener transacciones: ', error);
      throw error;
    }
  }
}
