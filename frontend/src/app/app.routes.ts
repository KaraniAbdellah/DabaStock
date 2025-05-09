import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthComponent } from './pages/auth/auth.component';
import { StockComponent } from './component/stock/stock.component';
import { ProductComponent } from './component/product/product.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      { path: 'add_stock', component: StockComponent, title: 'Create Stock' },
      { path: 'supplier', component: SupplierComponent, title: 'Suppliers' },
      { path: 'profile', component: ProfileComponent, title: 'Profile' },
      { path: 'product', component: ProductComponent, title: 'Profile' },
    ],
  },
  { path: 'auth', component: AuthComponent },
  { path: 'no_found', component: NotFoundComponent },
  { path: '**', redirectTo: 'no_found' },
];
