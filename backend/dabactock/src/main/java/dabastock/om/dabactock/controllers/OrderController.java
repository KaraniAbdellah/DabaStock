package dabastock.om.dabactock.controllers;

import dabastock.om.dabactock.model.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/order")
public class OrderController {

    @GetMapping("get_orders")
    public List<Order> getOrders() {
        List <Order> orders = new ArrayList<Order>();
        orders.add(new Order(1, "Order Name", "Customer Name",
                120.3, "20/23/2005", "Not Completed"));
        return orders;
    }

}
