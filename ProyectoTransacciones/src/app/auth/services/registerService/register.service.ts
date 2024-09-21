import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly apiUrl = 'http://localhost:3000/auth/register'; // URL backend

  async registerUser(userData: any): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, userData);
      console.log('Datos enviados');
      return response.data;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  private readonly AdminRegisterUserURL =
    'http://localhost:3000/auth/adminRegisterUser';

  async AdminRegisterUser(userData: any): Promise<any> {
    try {
      const response = await axios.post(this.AdminRegisterUserURL, userData);
      console.log('Datos enviados');
      return response.data;
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
