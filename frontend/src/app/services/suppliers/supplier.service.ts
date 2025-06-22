import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private url = "http://127.0.0.1:8080/supplier";
  constructor(private http: HttpClient) { }

  getSupplier(user_id_iden: string) {
    return this.http.get(`${this.url}/get_supplier/${user_id_iden}`);
  }

  postSupplier(data: any) {
    return this.http.post(`${this.url}/post_supplier`, data);
  }

  updateSupplier(data: any,  id: any) {
    return this.http.put(`${this.url}/update_supplier/${id}`, data);
  }

  deleteSupplier(id: any) {
    return this.http.delete(`${this.url}/delete_supplier/${id}`);
  }
}

