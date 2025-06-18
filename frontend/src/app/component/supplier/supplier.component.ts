import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SupplierService } from '../../services/suppliers/supplier.service';

@Component({
  selector: 'app-supplier',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css',
  providers: [SupplierService],
})
export class SupplierComponent {
  supplier_service = inject(SupplierService);
  suppliers: any[] = []; // Array of supplier objects
  submission_status = signal({
    status: false,
    text: 'All Fields Required',
    color: 'red',
  });
  message = {
    message_text: 'Start Adding Suppliers',
    text_color: 'text-yellow-500',
    bg_color: 'bg-zinc-800',
  };

  form_state: string = 'Create Supplier';
  supplier_name: string = '';
  contact_person: string = '';
  supplier_email: string = '';
  phone_number: string = '';
  supplier_address: string = '';
  current_supplier_id: number | null = null;

  add_supplier() {
    if (
      this.supplier_name &&
      this.contact_person &&
      this.supplier_email &&
      this.phone_number &&
      this.supplier_address
    ) {
      if (this.form_state === 'Create Supplier') {
        // Create new supplier
        const supplier = {
          supplier_name: this.supplier_name,
          contact_person: this.contact_person,
          supplier_email: this.supplier_email,
          phone_number: this.phone_number,
          supplier_address: this.supplier_address,
        };
        this.suppliers.push(supplier);

        // Send Request to Add Endpoint
        this.supplier_service.postSupplier(supplier).subscribe({
          next: (response) => {
            this.message.message_text = 'Supplier added successfully';
            this.message.text_color = 'text-white';
            this.message.bg_color = 'bg-green-600';
            setTimeout(() => {
              this.message.message_text = 'Start Adding Suppliers';
              this.message.text_color = 'text-yellow-500';
              this.message.bg_color = 'bg-zinc-800';
            }, 3000);
          },
          error: (err) => {
            console.error('Error adding supplier:', err);
          },
        });
        setTimeout(() => {
          this.getSupplier();
        }, 2000);
      } else {
        // Update existing supplier
        const supplierIndex = this.suppliers.findIndex(
          (sup) => sup.supplier_id === this.current_supplier_id
        );

        if (supplierIndex !== -1) {
          this.suppliers[supplierIndex] = {
            ...this.suppliers[supplierIndex],
            supplier_name: this.supplier_name,
            contact_person: this.contact_person,
            supplier_email: this.supplier_email,
            phone_number: this.phone_number,
            supplier_address: this.supplier_address,
          };
        }

        // Send Request to Update Endpoint
        let updateSupplier = this.suppliers[supplierIndex];
        this.supplier_service
          .updateSupplier(updateSupplier, this.current_supplier_id)
          .subscribe({
            next: (response) => {
              this.message.message_text = 'Supplier updated successfully';
              this.message.text_color = 'text-white';
              this.message.bg_color = 'bg-green-600';
              setTimeout(() => {
                this.message.message_text = 'Start Adding Suppliers';
                this.message.text_color = 'text-yellow-500';
                this.message.bg_color = 'bg-zinc-800';
              }, 3000);
            },
            error: (err) => {
              console.error('Error Updating Supplier:', err);
            },
          });
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
      this.contact_person = '';
      this.supplier_email = '';
      this.phone_number = '';
      this.supplier_address = '';
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
      this.contact_person = updatedSupplier.contact_person;
      this.supplier_email = updatedSupplier.supplier_email;
      this.phone_number = updatedSupplier.phone_number;
      this.supplier_address = updatedSupplier.supplier_address;
      this.current_supplier_id = supplier_id;
    }
  }

  delete_supplier(supplier_id: number) {
    this.suppliers = this.suppliers.filter(
      (sup) => sup.supplier_id !== supplier_id
    );
    console.log(supplier_id);
    // Send Request to Delete Endpoint
    this.supplier_service.deleteSupplier(supplier_id).subscribe({
      next: (response) => {
        this.message.message_text = 'Supplier deleted successfully';
        this.message.text_color = 'text-white';
        this.message.bg_color = 'bg-green-600';
        setTimeout(() => {
          this.message.message_text = 'Start Adding Suppliers';
          this.message.text_color = 'text-yellow-500';
          this.message.bg_color = 'bg-zinc-800';
        }, 3000);
      },
      error: (err) => {
        console.error('Error Deleting Supplier:', err);
      },
    });
  }

  getSupplier() {
    this.supplier_service.getSupplier().subscribe((data: any) => {
      this.suppliers = data;
      if (this.suppliers.length == 0) {
        this.message.message_text = 'No suppliers found';
        this.message.text_color = 'text-blue-500';
        this.message.bg_color = 'bg-zinc-800';
      }
    });
  }

  ngOnInit() {
    this.getSupplier();
  }
}
