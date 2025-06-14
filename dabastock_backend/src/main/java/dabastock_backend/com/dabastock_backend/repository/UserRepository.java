package dabastock_backend.com.dabastock_backend.repository;

import dabastock_backend.com.dabastock_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
