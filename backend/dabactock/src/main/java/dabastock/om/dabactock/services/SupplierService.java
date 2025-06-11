package dabastock.om.dabactock.services;

import dabastock.om.dabactock.model.Product;
import dabastock.om.dabactock.model.Supplier;
import dabastock.om.dabactock.repository.ProductRepository;
import dabastock.om.dabactock.repository.SupplierRepository;
import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class SupplierService {
    @Autowired
    SupplierRepository supplier_repo;

    @Autowired
    ProductRepository product_repo;

    public List<Supplier> getSuppliers() {
        return supplier_repo.findAll();
    }

    public Supplier addSupplier(Supplier supplier) {
        return supplier_repo.save(supplier);
    }

    public void updateSupplier(int id, Supplier new_supplier) {
        Supplier supplier = supplier_repo.findById(id).orElse(null);
        if (supplier != null) {
            supplier.setPhone_number(new_supplier.getPhone_number());
            supplier.setSupplier_address(new_supplier.getSupplier_address());
            supplier.setContact_person(new_supplier.getContact_person());
            supplier.setSupplier_email(new_supplier.getSupplier_email());
            supplier.setSupplier_name(new_supplier.getSupplier_name());
            supplier_repo.save(supplier);
        }
    }

    public void deleteSupplier(int id) {
        Supplier supplier = supplier_repo.findById(id).orElse(null);
        if (supplier != null) {
            // Search In Product How Have this Supplier name
            String supplier_name = supplier.getSupplier_name();
            List<Integer> product_id_matched = new ArrayList<>();
            List<Product> products = product_repo.findAll();

            // Loop Thought Products
            for (Product product: products) {
                if (Objects.equals(product.getSupplier_name(), supplier_name)) product_id_matched.add(product.getProduct_id());
            }

            // Delete Product That match Supplier Name
            for (int product_id: product_id_matched) {
                product_repo.deleteById(product_id);
            }

            supplier_repo.deleteById(id);
        }
    }

}
