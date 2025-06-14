package dabastock_backend.com.dabastock_backend.services;

import dabastock_backend.com.dabastock_backend.model.User;
import dabastock_backend.com.dabastock_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SignInService {
    @Autowired
    UserRepository user_repo;

    public User addUser(User new_user) {
        return user_repo.save(new_user);
    }

    public List<User> findUser(String user_email) {
        return user_repo.findAll();
    }
}


