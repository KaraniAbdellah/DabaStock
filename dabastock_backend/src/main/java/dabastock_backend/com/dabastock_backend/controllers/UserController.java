package dabastock_backend.com.dabastock_backend.controllers;

import dabastock_backend.com.dabastock_backend.model.Order;
import dabastock_backend.com.dabastock_backend.model.Product;
import dabastock_backend.com.dabastock_backend.model.Supplier;
import dabastock_backend.com.dabastock_backend.model.User;
import dabastock_backend.com.dabastock_backend.services.OrderService;
import dabastock_backend.com.dabastock_backend.services.ProductServices;
import dabastock_backend.com.dabastock_backend.services.SupplierService;
import dabastock_backend.com.dabastock_backend.services.UserService;
import org.jasypt.util.text.AES256TextEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.util.text.AES256TextEncryptor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService user_sev;
    @Autowired
    ProductServices product_serv;
    @Autowired
    OrderService order_serv;

    @Autowired
    SupplierService supplier_serv;

    @Value("${app.secret.key}")
    private String secret_Key;

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
                AES256TextEncryptor textEncryptor = new AES256TextEncryptor();
                textEncryptor.setPassword(secret_Key);
                String encryptedPassword = textEncryptor.encrypt(new_user_info.getUser_password());
                new_user_info.setUser_password(encryptedPassword);

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
                // Delete All Products, Order and Suppliers that have the user
                List<Product> products = product_serv.getAllProducts();
                List<Supplier> suppliers = supplier_serv.getSuppliers();
                List<Order> orders = order_serv.getOrders();

                // if we delete supplier auto we delete products
                for (int i = 0; i < suppliers.size(); i++) {
                    if (suppliers.get(i).getUser_id_iden().equals(user_id_iden)) {
                        supplier_serv.deleteSupplier(suppliers.get(i).getSupplier_id());
                    }
                }

                for (int i = 0; i < orders.size(); i++) {
                    if (orders.get(i).getUser_id_iden().equals(user_id_iden)) {
                        order_serv.deleteOrder(orders.get(i).getOrder_id());
                    }
                }

                user_sev.deleteUser(user);
                return new ResponseEntity<User>(user, HttpStatusCode.valueOf(200));
            }
        }
        return new ResponseEntity<User>(new User(), HttpStatusCode.valueOf(404));
    }
}




