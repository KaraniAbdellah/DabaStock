package dabastock_backend.com.dabastock_backend.services;

import dabastock_backend.com.dabastock_backend.model.User;
import dabastock_backend.com.dabastock_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository user_repo;

    public void deleteUser(User user) {
        user_repo.deleteById(user.getUser_id());
    }

    public List<User> getUsers() {
        return user_repo.findAll();
    }

    public void updateUser(User userToUpdate, User new_user) {
        userToUpdate.setUser_password(new_user.getUser_password());
        userToUpdate.setUser_email(new_user.getUser_email());
        userToUpdate.setUser_name(new_user.getUser_name());
        user_repo.save(userToUpdate);
    }
}

