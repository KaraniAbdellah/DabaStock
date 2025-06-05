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
    console.log("We Should Send Request");
    return this.http.post(`${this.url}/add_product`, data);
  }

  test() {
    console.log("Hello World");
  }
  
}
