import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import RolsService from '../rols/rols.service';

export const rolGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const rol = inject(RolsService);

  const rolUser = await rol.getRol();
  console.log(rolUser);

  if (rolUser === 'Administrador') {
    console.log('Usuario es: ', rolUser);
    return true;
  } else {
    console.log('No tiene acceso permitido a esta funcion');
    return false;
  }
};
