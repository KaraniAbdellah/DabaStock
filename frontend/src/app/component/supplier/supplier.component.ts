import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-supplier',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent {
  suppliers: any[] = []; // Array of supplier objects
  submission_status = signal({
    status: false,
    text: "All Fields Required",
    color: "red"
  });

  supplier_name: string = ""
  contact_name: string = ""
  email: string = ""
  phone: string = ""
  address: string = ""

  add_supplier() {
    if (this.supplier_name && this.contact_name && this.email && this.phone && this.address) {
      this.suppliers.push({
        supplier_name: this.supplier_name,
        contact_name: this.contact_name,
        email: this.email,
        phone: this.phone,
        address: this.address,
      });
      this.submission_status().status = false;
      // Reset form fields
      this.supplier_name = "";
      this.contact_name = "";
      this.email = "";
      this.phone = "";
      this.address = "";
    } else {
      this.submission_status().status = true;
      console.log("Please fill all fields");
    }
  }

  // These methods would be implemented in a real application
  edit_supplier(supplier: any) {
    // Logic to edit supplier
    console.log("Edit supplier:", supplier);
  }

  delete_supplier(index: number) {
    // Logic to delete supplier
    this.suppliers.splice(index, 1);
  }
}