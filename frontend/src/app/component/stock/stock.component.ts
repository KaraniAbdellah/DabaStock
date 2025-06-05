import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StockService } from '../../services/stock/stock.service';

@Component({
  selector: 'app-stock',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
  providers: [StockService]
})
export class StockComponent {
  productService = inject(StockService);

  suppliers = signal([{ name: 'ahmed' }, { name: 'Mohamed' }]);
  products: any[] = []; // Array Of Objects (products)
  submission_status = signal({
    status: false,
    text: 'All Filied Required',
    color: 'red',
  });

  form_state: String = 'Create Product';
  product_name: string = '';
  product_description: string = '';
  product_quantity: string = '0';
  product_price: string = '0';
  supplier_name: string = '';
  current_product_id: Number | null = null;

  add_product() {
    if (
      this.product_name &&
      this.product_description &&
      this.product_quantity &&
      this.product_price &&
      this.supplier_name
    ) {
      if (this.form_state == 'Create Product') {

        // Send Request to Add Product Endpoint
        let product = {
          product_name: this.product_name,
          product_description: this.product_description,
          product_quantity: this.product_quantity,
          product_price: this.product_price,
          supplier_name: this.supplier_name
        }
        this.products.push(product);
        console.log(product);
        this.productService.addProduct(product).subscribe({
          next: (response) => {
            console.log('Product added:', response);
          },
          error: (err) => {
            console.error('Error adding product:', err);
          }
        });
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
            product_description: this.product_description,
            product_quantity: this.product_quantity,
            product_price: this.product_price,
            supplier_name: this.supplier_name,
          };
        }

        console.log(this.current_product_id);
        let updatedProduct = this.products[productIndex];
        console.log(updatedProduct);

        // Send Request to Update Product Endpoint
        this.productService.updateProduct(this.current_product_id, updatedProduct).subscribe({
          next: (response) => {
            console.log('Product Updated:', response);
          },
          error: (err) => {
            console.error('Error updated product:', err);
          }
        });


        // Reset form to create (Default)
        this.form_state = 'Create Product';
        this.current_product_id = null;
      }

      this.submission_status().status = false;

      // Reset All Fields
      this.product_name = '';
      this.product_description = '';
      this.product_quantity = '0';
      this.product_price = '0';
      this.supplier_name = '';
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
    this.product_description = updatedProduct.product_description;
    this.product_quantity = updatedProduct.product_quantity;
    this.product_price = updatedProduct.product_price;
    this.supplier_name = updatedProduct.supplier_name;
    this.current_product_id = product_id;
  }

  delete_product(product_id: Number) {
    console.log(product_id);
    this.productService.deleteProduct(product_id).subscribe({
      next: (response) => {
        console.log('Product Deleted:', response);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      }
    });
    console.log(this.products);
    this.products = this.products.filter(
      (product) => product_id != product.product_id
    );
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

}


