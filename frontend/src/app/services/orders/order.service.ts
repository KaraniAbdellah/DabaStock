import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://127.0.0.1:8080/order";  
  constructor(private http: HttpClient) { }

  getOrders(user_id_iden: any) {
    console.log(`${this.url}/get_orders/${user_id_iden}`);
    return this.http.get(`${this.url}/get_orders/${user_id_iden}`);
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.url}/delete_order/${id}`);
  }


  addOrder(data: any) {
    return this.http.post(`${this.url}/post_order`, data);
  }

  updateOrder(id: any, data: any) {
    return this.http.put(`${this.url}/update_order/${id}`, data);
  }

}

