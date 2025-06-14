package dabastock_backend.com.dabastock_backend.repository;


import dabastock_backend.com.dabastock_backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

}

