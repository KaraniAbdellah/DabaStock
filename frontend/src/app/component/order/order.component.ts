import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  statuses = signal(['Pending', 'Processing', 'Completed', 'Cancelled']);
  orders: any[] = []; // This Array Contain All Orders

  submission_status = signal({
    status: false,
    text: "All Fields Required",
    color: "red"
  });

  order_number: string = ""
  customer_name: string = ""
  total_amount: string = "0"
  date: string = ""
  status: string = ""

  add_order() {
    if (this.order_number && this.customer_name && this.total_amount && this.date && this.status) {
      this.orders.push({
        order_number: this.order_number,
        customer_name: this.customer_name,
        total_amount: this.total_amount,
        date: this.date,
        status: this.status,
      });
      this.submission_status().status = false;

      // Reset All Fields
      this.order_number = "";
      this.customer_name = "";
      this.total_amount = "0";
      this.date = "";
      this.status = "";
    } else {
      this.submission_status().status = true;
      console.log("Please fill all fields");
    }
  }
}