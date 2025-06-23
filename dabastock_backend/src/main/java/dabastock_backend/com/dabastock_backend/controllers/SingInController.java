package dabastock_backend.com.dabastock_backend.controllers;

import dabastock_backend.com.dabastock_backend.model.User;
import dabastock_backend.com.dabastock_backend.services.LoginService;
import dabastock_backend.com.dabastock_backend.services.SignInService;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.util.text.AES256TextEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/signin")

public class SingInController {
    @Autowired
    SignInService sign_serv;

    @Autowired
    private StringEncryptor encryptor;

    @Value("${app.secret.key}")
    private String secret_Key;

    @PostMapping("/add_user")
    public ResponseEntity<User> addUser(@RequestBody User new_user) {
        // Check Is User Already Exit
        List<User> users = sign_serv.findUser(new_user.getUser_email());
        for (User user : users) {
            if (new_user.getUser_email().equals(user.getUser_email())) {
                return new ResponseEntity<User>(user, HttpStatusCode.valueOf(400));
            }
        }

        // Encrypt the password using Jasypt
        AES256TextEncryptor textEncryptor = new AES256TextEncryptor();
        textEncryptor.setPassword(secret_Key);
        String encryptedPassword = textEncryptor.encrypt(new_user.getUser_password());
        new_user.setUser_password(encryptedPassword);

        // Add User
        User user_add = sign_serv.addUser(new_user);

        return new ResponseEntity<User>(user_add, HttpStatusCode.valueOf(200));
    }
}


