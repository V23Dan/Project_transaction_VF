import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export default class RolsService {
  private readonly rolUsersURL = 'http://localhost:3000/rols/getUsersRols';

  async getUserRols(): Promise<any> {
    try {
      const response = await axios.get(this.rolUsersURL, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener roles de usuarios:');
      throw error;
    }
  }

  private readonly rolURL = 'http://localhost:3000/rols/getRol';

  async getRol(): Promise<any> {
    try {
      const response = await axios.get(this.rolURL, { withCredentials: true });
      const rol = response.data.nameRol;
      return rol;
    } catch (error) {
      console.error('Error al obtener rol:');
      throw error;
    }
  }
}
