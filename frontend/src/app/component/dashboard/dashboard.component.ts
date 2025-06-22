import { Component, inject, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SupplierService } from '../../services/suppliers/supplier.service';
import { OrderService } from '../../services/orders/order.service';
import { StockService } from '../../services/stock/stock.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [SupplierService, OrderService, StockService, AuthService, Router]
})
export class DashboardComponent {
  constructor(private router: Router) {}
  auth_service = inject(AuthService);
  supplier_service = inject(SupplierService);
  product_service = inject(StockService);
  order_service = inject(OrderService);

  user_id_iden: string = `${document.cookie.split('; ').find(c => c?.startsWith('user_id_iden='))?.split('=')[1] || ''}`;

  product_number = signal(0)
  supplier_number = signal(0)
  orders_number = signal(0)

  ngOnInit() {
    // get The Number of Order, Product and Suppliers
    this.supplier_service.getSupplier(this.user_id_iden).subscribe((data: any) => {
      this.supplier_number.update(() => data.length);
    });
    this.product_service.getAllProducts(this.user_id_iden).subscribe((data: any) => {
      this.product_number.update(() => data.length);
    });
    this.order_service.getOrders(this.user_id_iden).subscribe((data: any) => {
      this.orders_number.update(() => data.length);
    });
  }
}
