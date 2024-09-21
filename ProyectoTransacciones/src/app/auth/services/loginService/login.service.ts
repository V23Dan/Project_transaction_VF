import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export default class LoginService {
  private readonly apiUrl = 'http://localhost:3000/auth/login'; // URL backend

  constructor(private router: Router) {}
  async loginUser(userDataLogin: any): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, userDataLogin, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log('Error de login.service: ', error);
    }
  }

  async logoutUser(): Promise<any> {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/logout',
        {},
        {
          withCredentials: true, // Incluir cookies en la solicitud
        }
      );
      this.router.navigate(['/auth/login'], { replaceUrl: true });
      return response.data;
    } catch (error) {
      console.error('Error de logout.service: ', error);
      throw error;
    }
  }

  // login.service.ts
  async isLogin(): Promise<boolean> {
    try {
      const response = await axios.get('http://localhost:3000/auth/isAuth', {
        withCredentials: true, // Incluye cookies en la solicitud
      });

      if (response.status === 200) {
        console.log('Usuario autenticado');
        return true; // Usuario autenticado
      } else {
        console.log('No existe token');
        return false; // Usuario no autenticado
      }
    } catch (error) {
      console.error('Error de isLogin.service: ', error);
      return false; // Usuario no autenticado si hay un error
    }
  }
}
