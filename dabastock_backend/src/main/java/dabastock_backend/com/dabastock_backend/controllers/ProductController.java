package dabastock_backend.com.dabastock_backend.controllers;


import dabastock_backend.com.dabastock_backend.model.Order;
import dabastock_backend.com.dabastock_backend.model.Product;
import dabastock_backend.com.dabastock_backend.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")

public class ProductController {
    @Autowired
    ProductServices product_service;

    @GetMapping("/get_products/{user_id_iden}")
    public List<Product> getAllProduct(@PathVariable String user_id_iden) {
        List<Product> products = product_service.getAllProducts();
        products.removeIf(product -> !product.getUser_id_iden().equals(user_id_iden));
        return products;
    }

    @PostMapping ("/add_product")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        System.out.println("Hello Add Product End Point");
        Product add_product =  product_service.AddProduct(product);
        return new ResponseEntity<>(add_product, HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("/delete_product/{id}")
    public void deleteProduct(@PathVariable int id) {
        System.out.println("Delete Product " + id);
        product_service.deleteProduct(id);
    }

    @PutMapping("/update_product/{id}")
    public void updateProduct(@RequestBody Product product, @PathVariable int id) {
        product_service.updateProduct(product, id);
    }

}



