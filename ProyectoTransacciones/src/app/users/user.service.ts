// user.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userUrl = 'http://localhost:3000/users/DataUser';

  async getUserData(): Promise<any> {
    try {
      const response = await axios.get(this.userUrl, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos del usuario:');
      throw error;
    }
  }

  private readonly accountUrl = 'http://localhost:3000/users/DataAccount';
  async getAccountData(): Promise<any> {
    try {
      const response = await axios.get(this.accountUrl, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos de la cuenta:');
      throw error;
    }
  }
}
