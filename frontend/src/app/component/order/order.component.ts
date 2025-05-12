import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  statuses = signal(['Pending', 'Processing', 'Completed', 'Cancelled']);
  orders: any[] = []; // This Array Contain All Orders

  submission_status = signal({
    status: false,
    text: 'All Fields Required',
    color: 'red',
  });

  form_order_state: string = 'Create Order';
  order_number: string = '';
  customer_name: string = '';
  total_amount: string = '0';
  date: string = '';
  status: string = '';
  current_order_id: number | null = null;

  add_order() {
    if (
      this.order_number &&
      this.customer_name &&
      this.total_amount &&
      this.date &&
      this.status
    ) {
      if (this.form_order_state === 'Create Order') {
        this.orders.push({
          order_id: Date.now(),
          order_number: this.order_number,
          customer_name: this.customer_name,
          total_amount: this.total_amount,
          date: this.date,
          status: this.status,
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
            order_number: this.order_number,
            customer_name: this.customer_name,
            total_amount: this.total_amount,
            date: this.date,
            status: this.status,
          };
        }

        // Send Request to Update Order Endpoint
        /////////////////////// ......................

        // Reset form state
        this.form_order_state = 'Create Order';
        this.current_order_id = null;
      }

      this.submission_status().status = false;

      // Reset all fields
      this.order_number = '';
      this.customer_name = '';
      this.total_amount = '0';
      this.date = '';
      this.status = '';
    } else {
      this.submission_status.update((prev) => ({
        ...prev,
        status: true,
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
      this.order_number = updatedOrder.order_number;
      this.customer_name = updatedOrder.customer_name;
      this.total_amount = updatedOrder.total_amount;
      this.date = updatedOrder.date;
      this.status = updatedOrder.status;
      this.current_order_id = order_id;
    }
  }

  delete_order(order_id: number) {
    this.orders = this.orders.filter((order) => order.order_id !== order_id);
    // Send Request to Delete Order Endpoint
    /////////////////////// ......................
  }
}
