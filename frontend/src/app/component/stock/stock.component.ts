import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stock',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent {
  suppliers = signal([{ name: 'ahmed' }, { name: 'Mohamed' }]);
  products: any[] = []; // Array Of Objects (products)
  submission_status = signal({
    status: false,
    text: 'All Filied Required',
    color: 'red',
  });

  product_name: string = '';
  description: string = '';
  quantity: string = '0';
  price: string = '0';
  supplier: string = '';

  add_product() {
    if (
      this.product_name &&
      this.description &&
      this.quantity &&
      this.price &&
      this.supplier
    ) {
      this.products.push({
        product_name: this.product_name,
        description: this.description,
        quantity: this.quantity,
        price: this.price,
        supplier: this.supplier,
      });
      this.submission_status().status = false;

      // Reset All Fields
      this.product_name = '';
      this.description = '';
      this.quantity = '0';
      this.price = '0';
      this.supplier = '';
    } else {
      this.submission_status().status = true;
      console.log('Select All Filieds');
    }
  }
}
