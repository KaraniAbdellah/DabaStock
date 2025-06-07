import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://127.0.0.1:8080/order";  
  constructor(private http: HttpClient) { }
  test() {
    console.log("Hello World");
  }

  getOrders() {
    return this.http.get(`${this.url}/get_orders`);
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.url}/delete_order/${id}`);
  }


  addOrder(data: any) {
    return this.http.post(`${this.url}/post_order`, data);
  }

  updateProduct(id: any, data: any) {
    return this.http.put(`${this.url}/update_order/${id}`, data);
  }

}

