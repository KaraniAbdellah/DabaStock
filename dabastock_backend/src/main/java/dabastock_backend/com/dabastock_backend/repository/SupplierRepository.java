package dabastock_backend.com.dabastock_backend.repository;

import dabastock_backend.com.dabastock_backend.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

}
