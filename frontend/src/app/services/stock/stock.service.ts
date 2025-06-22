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

  getAllProducts(user_id_iden: string) {
    return this.http.get(`${this.url}/get_products/${user_id_iden}`);
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
}

