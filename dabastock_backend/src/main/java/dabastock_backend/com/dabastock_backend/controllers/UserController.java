package dabastock_backend.com.dabastock_backend.controllers;

import dabastock_backend.com.dabastock_backend.model.User;
import dabastock_backend.com.dabastock_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService user_sev;

    @GetMapping("/getUser/{user_id_iden}")
    public ResponseEntity<User> getUser(@PathVariable String user_id_iden) {
        List<User> users = user_sev.getUsers();
        for (User user : users) {
            if (user.getUser_id_iden().equals(user_id_iden)) {
                return new ResponseEntity<User>(user, HttpStatusCode.valueOf(200));
            }
        }
        return new ResponseEntity<User>(new User(), HttpStatusCode.valueOf(404));
    }

    @PutMapping("/updateUser/{user_id_iden}")
    public ResponseEntity<User> updateUser(@RequestBody User new_user_info, @PathVariable String user_id_iden) {
        List<User> users = user_sev.getUsers();
        for (User user : users) {
            if (user.getUser_id_iden().equals(user_id_iden)) {
                user_sev.updateUser(user, new_user_info);
                return new ResponseEntity<User>(user, HttpStatusCode.valueOf(200));
            }
        }
        return new ResponseEntity<User>(new User(), HttpStatusCode.valueOf(404));
    }

    @DeleteMapping("/deleteUser/{user_id_iden}")
    public ResponseEntity<User> deleteUser(@PathVariable String user_id_iden) {
        List<User> users = user_sev.getUsers();
        for (User user : users) {
            if (user.getUser_id_iden().equals(user_id_iden)) {
                user_sev.deleteUser(user);
                return new ResponseEntity<User>(user, HttpStatusCode.valueOf(200));
            }
        }
        return new ResponseEntity<User>(new User(), HttpStatusCode.valueOf(404));
    }
}




