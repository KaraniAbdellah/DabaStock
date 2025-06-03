package dabastock.om.dabactock.controllers;


import dabastock.om.dabactock.model.Product;
import dabastock.om.dabactock.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")

public class ProductController {
    @Autowired
    ProductServices product_service;

    @GetMapping("/get_products")
    public List<Product> getAllProduct() {
        System.out.println("Getting Product End Point");
        return product_service.getAllProducts();
    }

    @PostMapping ("/add_product")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
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



