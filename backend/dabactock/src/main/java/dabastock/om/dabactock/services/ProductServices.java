package dabastock.om.dabactock.services;


import dabastock.om.dabactock.model.Product;
import dabastock.om.dabactock.repository.ProductRepository;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServices {

    @Autowired
    ProductRepository product_repo;

    public List<Product> getAllProducts() {
        return product_repo.findAll();
    }

    public Product AddProduct(Product product) {
        return product_repo.save(product);
    }

    public void deleteProduct(int id) {
        product_repo.deleteById(id);
    }

    public void updateProduct(Product product, int id) {
        Product UpdatedProduct = product_repo.findById(id).orElse(null);
        if (UpdatedProduct != null) {
            UpdatedProduct.setProduct_name(product.getProduct_name());
            UpdatedProduct.setProduct_description(product.getProduct_description());
            UpdatedProduct.setProduct_quantity(product.getProduct_quantity());
            UpdatedProduct.setProduct_price(product.getProduct_price());
            UpdatedProduct.setSupplier_name(product.getSupplier_name());
            product_repo.save(UpdatedProduct);
        }
    }
}
