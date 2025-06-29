package dabastock_backend.com.dabastock_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private int order_id;

    @Column(name="order_name")
    private String order_name;

    @Column(name="customer_name")
    private String customer_name;

    @Column(name="total_amount")
    private double total_amount;

    @Column(name="order_date")
    private String order_date;

    @Column(name="order_status")
    private String order_status;

    @Column(name="user_id_iden")
    private String user_id_iden;


    public Order(int order_id, String user_id_iden, String order_name, String customer_name, double total_amount, String order_date, String order_status) {
        this.order_id = order_id;
        this.order_name = order_name;
        this.customer_name = customer_name;
        this.total_amount = total_amount;
        this.order_date = order_date;
        this.order_status = order_status;
        this.user_id_iden = user_id_iden;
    }

    public String getUser_id_iden() {
        return user_id_iden;
    }

    public void setUser_id_iden(String user_id_iden) {
        this.user_id_iden = user_id_iden;
    }

    public Order() {

    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public String getOrder_name() {
        return order_name;
    }

    public void setOrder_name(String order_name) {
        this.order_name = order_name;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public double getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(double total_amount) {
        this.total_amount = total_amount;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }

    public String getOrder_status() {
        return order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }
}




