package dabastock.om.dabactock.controllers;

import dabastock.om.dabactock.model.Product;
import dabastock.om.dabactock.model.Supplier;
import dabastock.om.dabactock.services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    SupplierService supplier_service;

    @GetMapping("/get_supplier")
    public List<Supplier> getSupplier() {
        return supplier_service.getSuppliers();
    }

    @PostMapping("/post_supplier")
    public ResponseEntity<Supplier> postSupplier(@RequestBody Supplier supplier) {
        Supplier add_supplier=  supplier_service.addSupplier(supplier);
        return new ResponseEntity<>(add_supplier, HttpStatusCode.valueOf(200));
    }

    @PutMapping("/update_supplier/{id}")
    public void updateSupplier(@PathVariable int id, @RequestBody Supplier supplier) {
        supplier_service.updateSupplier(id, supplier);
    }

    @DeleteMapping("/delete_supplier/{id}")
    public void deleteSupplier(@PathVariable int id) {
        supplier_service.deleteSupplier(id);
    }

}
