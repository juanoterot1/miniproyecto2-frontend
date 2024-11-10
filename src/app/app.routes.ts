import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'credit-accounts',
    loadChildren: () => import('./modules/credit-account/credit-account.module').then(m => m.CreditAccountModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'inventory',
    loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule),
  },
  
  { path: '**', redirectTo: '/' }
];
