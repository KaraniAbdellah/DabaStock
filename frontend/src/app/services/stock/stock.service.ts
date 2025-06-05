import { Injectable } from '@angular/core';
import { Product } from './product.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) { }
  // get all products
  productItems: Array<Product> = [];
  // Get All Products
  private url = "http://127.0.0.1:8080/product";

  getAllProducts() {
    return this.http.get(`${this.url}/get_products`);
  }

  addProduct(data: any) {
    return this.http.post(`${this.url}/add_product`, data);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.url}/delete_product/${id}`);
  }
  updateProduct(id: any, data: any) {
    return this.http.put(`${this.url}/update_product/${id}`, data);
  }

  test() {
    console.log("Hello World");
  }
}

