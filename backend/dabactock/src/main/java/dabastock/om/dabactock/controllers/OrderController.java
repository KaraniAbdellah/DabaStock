package dabastock.om.dabactock.controllers;

import dabastock.om.dabactock.model.Order;
import dabastock.om.dabactock.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService order_service;

    @GetMapping("get_orders")
    public List<Order> getOrders() {
        List <Order> orders = new ArrayList<Order>();
        orders.add(new Order(1, "Order Name", "Customer Name",
                120.3, "20/23/2005", "Not Completed"));
        return orders;
    }

    @PostMapping("post_order")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        Order add_order = order_service.addProduct(order);
        return new ResponseEntity<Order>(add_order, HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("delete_order")
    public void deleteOrder(@RequestParam int id) {
        order_service.deleteOrder(id);
    }

    @PutMapping("update_order")
    public void updateOrder(@RequestBody Order order, @RequestParam int id) {
        order_service.updateOrder(id, order);
    }
}



