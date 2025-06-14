package dabastock_backend.com.dabastock_backend.services;

import dabastock_backend.com.dabastock_backend.model.User;
import dabastock_backend.com.dabastock_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    @Autowired
    UserRepository user_repo;

    public List<User> findUser() {
        return user_repo.findAll();
    }

}


