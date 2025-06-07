package dabastock.om.dabactock.services;

import dabastock.om.dabactock.model.Order;
import dabastock.om.dabactock.model.Product;
import dabastock.om.dabactock.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository order_repo;

    public List<Order>  getOrders() {
        return order_repo.findAll();
    }

    public Order addProduct(Order order) {
        return order_repo.save(order);
    }

    public void deleteOrder(int id) {
        order_repo.deleteById(id);
    }

    public void updateOrder(int id, Order new_order) {
        Order order_updated = order_repo.findById(id).orElse(null);
        if (order_updated != null) {
            order_updated.setOrder_name(new_order.getOrder_name());
            order_updated.setOrder_date(new_order.getOrder_date());
            order_updated.setOrder_status(new_order.getOrder_status());
            order_updated.setCustomer_name(new_order.getCustomer_name());
            order_updated.setTotal_amount(new_order.getTotal_amount());
            order_repo.save(order_updated);
        }
    }


}
