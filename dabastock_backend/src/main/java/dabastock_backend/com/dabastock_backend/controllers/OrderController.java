package dabastock_backend.com.dabastock_backend.controllers;

import dabastock_backend.com.dabastock_backend.model.Order;
import dabastock_backend.com.dabastock_backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService order_service;

    @GetMapping("/get_orders/{user_id_iden}")
    public List<Order> getOrders(@PathVariable String user_id_iden) {
        List<Order> orders = order_service.getOrders();
        for(Order order: orders) {
            if (!order.getUser_id_iden().equals(user_id_iden)) {
                orders.remove(order);
            }
        }
        return orders;
    }

    @PostMapping("/post_order")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        Order add_order = order_service.addProduct(order);
        return new ResponseEntity<Order>(add_order, HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("/delete_order/{id}")
    public void deleteOrder(@PathVariable int id) {
        order_service.deleteOrder(id);
    }

    @PutMapping("/update_order/{id}")
    public void updateOrder(@RequestBody Order order, @PathVariable int id) {
        order_service.updateOrder(id, order);
    }
}

