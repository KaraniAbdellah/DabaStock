package dabastock_backend.com.dabastock_backend.controllers;

import dabastock_backend.com.dabastock_backend.model.User;
import dabastock_backend.com.dabastock_backend.services.LoginService;
import org.jasypt.util.text.AES256TextEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {
    @Autowired
    LoginService login_ser;

    @PostMapping("/getUserByLogin")
    public ResponseEntity<User> GetUserLogin(@RequestBody User user) {
        List<User> users = login_ser.findUser();

        String user_email = user.getUser_email();
        String user_password = user.getUser_password();

        AES256TextEncryptor textEncryptor = new AES256TextEncryptor();
        textEncryptor.setPassword("your-secret-password");

        for (User u : users) {
            if (u.getUser_email().equals(user_email)) {
                String decryptedPassword = textEncryptor.decrypt(u.getUser_password());
                if (decryptedPassword.equals(user_password)) {
                    return new ResponseEntity<>(u, HttpStatusCode.valueOf(200));
                }
            }
        }

        return new ResponseEntity<>(null, HttpStatusCode.valueOf(401));
    }
}
