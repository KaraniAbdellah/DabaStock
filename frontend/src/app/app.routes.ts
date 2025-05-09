import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'supplier',
    component: SupplierComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];
