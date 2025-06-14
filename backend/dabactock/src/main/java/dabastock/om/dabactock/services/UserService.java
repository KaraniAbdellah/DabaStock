package dabastock.om.dabactock.services;

import dabastock.om.dabactock.model.User;
import dabastock.om.dabactock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository user_repo;
    public User addUser(User new_user) {
        return user_repo.save(new_user);
    }

    public void deleteUser(int user_id) {
        user_repo.deleteById(user_id);
    }

    public User getUser(int user_id) {
        return user_repo.findById(user_id).orElse(null);
    }

    public void updateUser(int user_id, User new_user) {
        User user_to_update = user_repo.findById(user_id).orElse(null);
        if (user_to_update != null) {
            user_to_update.setUser_email(new_user.getUser_email());
            user_to_update.setUser_name(new_user.getUser_name());
            user_to_update.setUser_password(new_user.getUser_password());
            user_repo.save((user_to_update));
        }
    }
}

