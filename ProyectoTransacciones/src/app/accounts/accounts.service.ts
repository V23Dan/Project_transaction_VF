import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private readonly AllAccountsUrl = 'http://localhost:3000/account/getAllAccounts';

  async getAllAccounts(): Promise<any> {
    try {
      const response = await axios.get(this.AllAccountsUrl, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener las cuentas: ', error);
      throw error;
    }
  }
}
