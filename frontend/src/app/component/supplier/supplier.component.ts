import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-supplier',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css',
})
export class SupplierComponent {
  suppliers: any[] = []; // Array of supplier objects
  submission_status = signal({
    status: false,
    text: 'All Fields Required',
    color: 'red',
  });

  form_state: string = 'Create Supplier';
  supplier_name: string = '';
  contact_name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  current_supplier_id: number | null = null;

  add_supplier() {
    if (
      this.supplier_name &&
      this.contact_name &&
      this.email &&
      this.phone &&
      this.address
    ) {
      if (this.form_state === 'Create Supplier') {
        // Create new supplier
        this.suppliers.push({
          supplier_id: Date.now(), // Simple unique ID using timestamp
          supplier_name: this.supplier_name,
          contact_name: this.contact_name,
          email: this.email,
          phone: this.phone,
          address: this.address,
        });
        // Send Request to Add Endpoint
        // ............
      } else {
        // Update existing supplier
        const supplierIndex = this.suppliers.findIndex(
          (sup) => sup.supplier_id === this.current_supplier_id
        );

        if (supplierIndex !== -1) {
          this.suppliers[supplierIndex] = {
            ...this.suppliers[supplierIndex],
            supplier_name: this.supplier_name,
            contact_name: this.contact_name,
            email: this.email,
            phone: this.phone,
            address: this.address,
          };
        }

        // Send Request to Update Endpoint
        // ............

        // Reset form state
        this.form_state = 'Create Supplier';
        this.current_supplier_id = null;
      }

      // Hide error message
      this.submission_status.update((prev) => ({
        ...prev,
        status: false,
      }));

      // Reset all fields
      this.supplier_name = '';
      this.contact_name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
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

  update_supplier(supplier_id: number) {
    const updatedSupplier = this.suppliers.find(
      (sup) => sup.supplier_id === supplier_id
    );

    if (updatedSupplier) {
      this.form_state = 'Update Supplier';
      this.supplier_name = updatedSupplier.supplier_name;
      this.contact_name = updatedSupplier.contact_name;
      this.email = updatedSupplier.email;
      this.phone = updatedSupplier.phone;
      this.address = updatedSupplier.address;
      this.current_supplier_id = supplier_id;
    }
  }

  delete_supplier(supplier_id: number) {
    this.suppliers = this.suppliers.filter(
      (sup) => sup.supplier_id !== supplier_id
    );
    // Send Request to Delete Endpoint
    // ............
  }
}
