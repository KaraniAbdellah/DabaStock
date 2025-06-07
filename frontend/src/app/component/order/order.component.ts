import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StockService } from '../../services/stock/stock.service';
import { OrderService } from '../../services/orders/order.service';

@Component({
  selector: 'app-order',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  providers: [OrderService]
})
export class OrderComponent {
  order_services = inject(OrderService)
  statuses = signal(['Pending', 'Processing', 'Completed', 'Cancelled']);
  orders: any[] = []; // This Array Contain All Orders

  submission_status = signal({
    order_status: false,
    text: 'All Fields Required',
    color: 'red',
  });

  form_order_state: string = 'Create Order';
  order_id: string = '';
  customer_name: string = '';
  total_amount: string = '0';
  order_date: string = '';
  order_status: string = '';
  current_order_id: number | null = null;

  add_order() {
    if (
      this.order_id &&
      this.customer_name &&
      this.total_amount &&
      this.order_date &&
      this.order_status
    ) {
      if (this.form_order_state === 'Create Order') {
        this.orders.push({
          order_id: this.order_id,
          customer_name: this.customer_name,
          total_amount: this.total_amount,
          order_date: this.order_date,
          order_status: this.order_status,
        });

        // Send Request to Add Order Endpoint
        /////////////////////// ......................
      } else {
        // Find the index of the order that will be updated
        const orderIndex = this.orders.findIndex(
          (order) => order.order_id === this.current_order_id
        );

        if (orderIndex !== -1) {
          this.orders[orderIndex] = {
            ...this.orders[orderIndex],
            order_id: this.order_id,
            customer_name: this.customer_name,
            total_amount: this.total_amount,
            order_date: this.order_date,
            order_status: this.order_status,
          };
        }

        // Send Request to Update Order Endpoint
        /////////////////////// ......................

        // Reset form state
        this.form_order_state = 'Create Order';
        this.current_order_id = null;
      }

      this.submission_status().order_status = false;

      // Reset all fields
      this.order_id = '';
      this.customer_name = '';
      this.total_amount = '0';
      this.order_date = '';
      this.order_status = '';
    } else {
      this.submission_status.update((prev) => ({
        ...prev,
        order_status: true,
        text: 'Please fill all fields',
        color: 'red',
      }));
      console.log('Please fill all fields');
    }
  }

  update_order(order_id: number) {
    const updatedOrder = this.orders.find(
      (order) => order.order_id === order_id
    );

    if (updatedOrder) {
      this.form_order_state = 'Update Order';
      this.order_id = updatedOrder.order_id;
      this.customer_name = updatedOrder.customer_name;
      this.total_amount = updatedOrder.total_amount;
      this.order_date = updatedOrder.order_date;
      this.order_status = updatedOrder.order_status;
      this.current_order_id = order_id;
    }
  }

  delete_order(order_id: number) {
    // Send Request to Delete Order Endpoint
    console.log(order_id);
    this.order_services.deleteOrder(order_id).subscribe({
      next: (response) => {
        console.log('Order Deleted:', response);
      },
      error: (err) => {
        console.error('Error deleting Order:', err);
      }
    });

    this.orders = this.orders.filter((order) => order.order_id !== order_id);

  }

  ngOnInit() {
    this.order_services.test();
    this.order_services.getOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }
}
