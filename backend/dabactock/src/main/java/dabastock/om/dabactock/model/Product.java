package dabastock.om.dabactock.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int product_id;

    @Column(name = "product_name")
    private String product_name;

    @Column(name = "product_description")
    private String product_description;

    @Column(name = "product_quantity")
    private int product_quantity;

    @Column(name = "product_price")
    private double product_price;

    @Column(name = "supplier_name")
    private String supplier_name;

    public String getProduct_description() {
        return this.product_description;
    }
    public int getProduct_id() {
        return this.product_id;
    }

    public void setProduct_description(String product_description) {
        this.product_description = product_description;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public double getProduct_price() {
        return product_price;
    }

    public void setProduct_price(double product_price) {
        this.product_price = product_price;
    }

    public String getProduct_name() {
        return this.product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public int getProduct_quantity() {
        return this.product_quantity;
    }

    public void setProduct_quantity(int product_quantity) {
        this.product_quantity = product_quantity;
    }



    public String getSupplier_name() {
        return this.supplier_name;
    }

    public void setSupplier_name(String supplier_name) {
        this.supplier_name = supplier_name;
    }

    public Product(String product_name, String product_description, int product_quantity, double product_price, String supplier_name) {
        this.product_name = product_name;
        this.product_description = product_description;
        this.product_quantity = product_quantity;
        this.product_price = product_price;
        this.supplier_name = supplier_name;
    }
    public Product() {

    }
}






