package dabastock_backend.com.dabastock_backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class UserController {

    @GetMapping("/getUser")
    public String getUser() {
        return "Abdellah";
    }
}
