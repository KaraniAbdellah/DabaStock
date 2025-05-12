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

  form_state: String = 'Create Product';
  product_name: string = '';
  description: string = '';
  quantity: string = '0';
  price: string = '0';
  supplier: string = '';
  current_product_id: Number | null = null;

  add_product() {
    if (
      this.product_name &&
      this.description &&
      this.quantity &&
      this.price &&
      this.supplier
    ) {
      if (this.form_state == 'Create Product') {
        this.products.push({
          product_id: Date.now(),
          product_name: this.product_name,
          description: this.description,
          quantity: this.quantity,
          price: this.price,
          supplier: this.supplier,
        });

        // Send Request to Add Product Endpoint
        ///// .......................
      } else {
        // Find the index of the product that will be updated
        const productIndex = this.products.findIndex(
          (product) => product.product_id === this.current_product_id
        );

        if (productIndex !== -1) {
          // Update the product
          this.products[productIndex] = {
            ...this.products[productIndex],
            product_name: this.product_name,
            description: this.description,
            quantity: this.quantity,
            price: this.price,
            supplier: this.supplier,
          };
        }

        // Send Request to Update Product Endpoint
        ///// .......................

        // Reset form to create (Default)
        this.form_state = 'Create Product';
        this.current_product_id = null;
      }

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

  update_product(product_id: Number) {
    console.log(product_id);
    console.log(this.products);

    // Set The Info in Form
    let updatedProduct: any = this.products.find(
      (product) => product.product_id == product_id
    );
    this.form_state = 'Update Product';
    this.product_name = updatedProduct.product_name;
    this.description = updatedProduct.description;
    this.quantity = updatedProduct.quantity;
    this.price = updatedProduct.price;
    this.supplier = updatedProduct.supplier;
    this.current_product_id = product_id;
  }

  delete_product(product_id: Number) {
    console.log(this.products);
    this.products = this.products.filter(
      (product) => product_id != product.product_id
    );
    // Send Request to Delete Order Endpoint
    ///// .......................
    console.log(this.products);
  }
}
