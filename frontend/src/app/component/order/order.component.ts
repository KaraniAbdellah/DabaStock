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
  providers: [OrderService],
})
export class OrderComponent {
  order_services = inject(OrderService);
  statuses = signal(['Pending', 'Processing', 'Completed', 'Cancelled']);
  orders: any[] = []; // This Array Contain All Orders
  message = {
    message_text: 'Start Adding Orders',
    text_color: 'text-yellow-500',
    bg_color: 'bg-zinc-800',
  };
  user_id_iden: string = `${document.cookie.split('; ').find(c => c?.startsWith('user_id_iden='))?.split('=')[1] || ''}`;


  submission_status = signal({
    order_status: false,
    text: 'All Fields Required',
    color: 'red',
  });

  form_order_state: string = 'Create Order';
  order_name: string = '';
  customer_name: string = '';
  total_amount: string = '0';
  order_date: string = '';
  order_status: string = '';
  current_order_id: number | null = null;

  add_order() {
    if (
      this.order_name &&
      this.customer_name &&
      this.total_amount &&
      this.order_date &&
      this.order_status
    ) {
      if (this.form_order_state === 'Create Order') {
        let order = {
          order_name: this.order_name,
          customer_name: this.customer_name,
          total_amount: parseFloat(this.total_amount),
          order_date: this.order_date,
          order_status: this.order_status,
          user_id_iden: this.user_id_iden
        };
        this.orders.push(order);

        // Send Request to Add Order Endpoint
        this.order_services.addOrder(order).subscribe({
          next: (response) => {
            this.message.message_text = 'Order added successfully';
            this.message.text_color = 'text-white';
            this.message.bg_color = 'bg-green-600';
            setTimeout(() => {
              this.message.message_text = 'Start Adding Orders';
              this.message.text_color = 'text-yellow-500';
              this.message.bg_color = 'bg-zinc-800';
            }, 3000);
          },
          error: (err) => {
            console.error('Error Added Order:', err);
          },
        });
        setTimeout(() => {
          this.getOrders(this.user_id_iden);
        }, 2000);
      } else {
        // Find the index of the order that will be updated
        const orderIndex = this.orders.findIndex(
          (order) => order.order_id === this.current_order_id
        );

        if (orderIndex !== -1) {
          // Update the local array first
          this.orders[orderIndex] = {
            ...this.orders[orderIndex],
            order_name: this.order_name,
            customer_name: this.customer_name,
            total_amount: parseFloat(this.total_amount),
            order_date: this.order_date,
            order_status: this.order_status,
            user_id_iden: this.user_id_iden
          };

          // Send Request to Update Order Endpoint with order_id and updated order data
          this.order_services
            .updateOrder(this.current_order_id, this.orders[orderIndex])
            .subscribe({
              next: (response) => {
                this.message.message_text = 'Order updated successfully';
                this.message.text_color = 'text-white';
                this.message.bg_color = 'bg-green-600';
                setTimeout(() => {
                  this.message.message_text = 'Start Adding Orders';
                  this.message.text_color = 'text-yellow-500';
                  this.message.bg_color = 'bg-zinc-800';
                }, 3000);
              },
              error: (err) => {
                console.error('Error Updating Order:', err);
              },
            });
        }

        // Reset form state
        this.form_order_state = 'Create Order';
        this.current_order_id = null;
      }

      this.submission_status().order_status = false;

      // Reset all fields
      this.order_name = '';
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
      this.order_name = updatedOrder.order_name;
      this.customer_name = updatedOrder.customer_name;
      this.total_amount = updatedOrder.total_amount.toString();
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
        this.message.message_text = 'Order deleted successfully';
        this.message.text_color = 'text-white';
        this.message.bg_color = 'bg-green-600';
        setTimeout(() => {
          this.message.message_text = 'Start Adding Orders';
          this.message.text_color = 'text-yellow-500';
          this.message.bg_color = 'bg-zinc-800';
        }, 3000);
      },
      error: (err) => {
        console.error('Error deleting Order:', err);
      },
    });
    this.orders = this.orders.filter((order) => order.order_id !== order_id);
  }

  getOrders(user_id_iden: string) {
    this.order_services.getOrders(user_id_iden).subscribe((data: any) => {
      this.orders = data;
      if (this.orders.length == 0) {
        this.message.message_text = 'No orders found';
        this.message.text_color = 'text-blue-500';
        this.message.bg_color = 'bg-zinc-800';
      }
    });
  }
  
  ngOnInit() {
    console.log("We Are In Init");
    this.getOrders(this.user_id_iden);
  }
}
