package dabastock.om.dabactock.services;

import dabastock.om.dabactock.model.Product;
import dabastock.om.dabactock.model.Supplier;
import dabastock.om.dabactock.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    @Autowired
    SupplierRepository supplier_repo;

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
        supplier_repo.deleteById(id);
    }
}
