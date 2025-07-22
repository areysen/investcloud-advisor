import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'portfolios/accounts',
    loadChildren: () => import('./features/accounts/accounts-module').then(m => m.AccountsModule)
  },
  {
    path: 'portfolios/holdings',
    loadChildren: () => import('./features/holdings/holdings-module').then(m => m.HoldingsModule)
  }
];