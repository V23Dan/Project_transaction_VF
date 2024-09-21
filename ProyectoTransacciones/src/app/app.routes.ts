import { Routes, CanActivateFn, CanActivate } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { rolGuard } from './guards/rol.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./auth/login/login.component'),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./auth/register/register.component'),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./pages/user/user.component'),
      },
      {
        path: 'transfer',
        title: 'Transfer',
        loadComponent: () =>
          import('./Transacciones/transferencias/transferencias.component'),
      },
      {
        path: 'deposit',
        title: 'Deposit',
        loadComponent: () =>
          import('./Transacciones/depositos/depositos.component'),
      },
      {
        path: 'retreat',
        title: 'Retreat',
        loadComponent: () =>
          import('./Transacciones/retiros/retiros.component'),
      },
      {
        path: 'transaction',
        title: 'Transaction',
        loadComponent: () =>
          import('./pages/transaction/transaction/transaction.component'),
      },
      {
        path: 'table',
        title: 'Table',
        loadComponent: () => import('./table/table.component'),
      },
      {
        path: 'rol-users',
        canActivate: [rolGuard],
        title: 'Rol Users',
        loadComponent: () => import('./pages/rol-users/rol-users.component'),
      },
      {
        path: 'Alltransaction',
        title: 'All Transaction',
        loadComponent: () =>
          import('./pages/transaction-app/transaction-app.component'),
      },
      {
        path: 'accounts',
        canActivate: [rolGuard],
        title: 'Accounts',
        loadComponent: () => import('./pages/accounts/accounts.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
