package dabastock_backend.com.dabastock_backend.repository;

import dabastock_backend.com.dabastock_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{



}

