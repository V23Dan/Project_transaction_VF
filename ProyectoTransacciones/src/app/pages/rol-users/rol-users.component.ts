import { Component, OnInit } from '@angular/core';
import RolsService from '../../rols/rols.service';
import { RouterModule } from '@angular/router';
import TableComponent from '../../table/table.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Input } from '@angular/core';
import AddUserComponent from './add-user/add-user.component';

@Component({
  selector: 'app-rol-users',
  standalone: true,
  imports: [RouterModule, TableComponent, CommonModule, MatTableModule, AddUserComponent],
  templateUrl: './rol-users.component.html',
  styles: ``,
})
export default class RolUsersComponent implements OnInit {
  @Input() isVisible: boolean = false;
  userRole: string | null = null; // Propiedad para almacenar el rol del usuario
  showModal = false;
  rolUsersArray: any[] = [];
  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Rol', field: 'nameRol' },
    { header: 'Nombre', field: 'nombre' },
    { header: 'Documento', field: 'documento' },
    { header: 'Metodo de ingreso', field: 'ingreso' },
    { header: 'Fecha creacion', field: 'createdAt' },
  ];
  constructor(private rolUsers: RolsService) {}

  async ngOnInit() {
    try {
      this.rolUsersArray = await this.rolUsers.getUserRols();
      this.loadUsersRols();
    } catch (error) {
      console.error('Error al cargar los usuarios y roles: ', error);
    }
  }
  loadUsersRols(): void {
    this.rolUsers
      .getUserRols()
      .then((data) => {
        this.rolUsersArray = data;
      })
      .catch((error) => {
        console.error('Error al obtener usuarios y roles', error);
      });
  }
}
