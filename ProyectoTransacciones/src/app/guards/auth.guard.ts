import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import LoginService from '../auth/services/loginService/login.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  const isAuthenticated = await loginService.isLogin(); // Espera a que se complete la verificación

  if (!isAuthenticated) {
    router.navigate(['/auth/login']); // Redirigir al login si no está autenticado
    return false; // Bloquear acceso
  }

  return true; // Permitir acceso si está autenticado
};
