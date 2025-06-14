package dabastock_backend.com.dabastock_backend.services;

import dabastock_backend.com.dabastock_backend.model.User;
import dabastock_backend.com.dabastock_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository user_repo;

    public void deleteUser(int user_id_iden) {
        user_repo.deleteById(user_id_iden);
    }

    public User getUser(int user_id_iden) {
        return user_repo.findById(user_id_iden).orElse(null);
    }

    public void updateUser(int user_id_iden, User new_user) {
        User user_to_update = user_repo.findById(user_id_iden).orElse(null);
        if (user_to_update != null) {
            user_to_update.setUser_email(new_user.getUser_email());
            user_to_update.setUser_name(new_user.getUser_name());
            user_to_update.setUser_password(new_user.getUser_password());
            user_repo.save((user_to_update));
        }
    }
}

