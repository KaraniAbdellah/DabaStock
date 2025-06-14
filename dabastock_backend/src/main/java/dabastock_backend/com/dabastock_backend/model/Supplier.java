package dabastock_backend.com.dabastock_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "supplier")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="supplier_id")
    private int supplier_id;


    @Column(name = "supplier_name")
    private String supplier_name;

    @Column(name = "contact_person")
    private String contact_person;

    @Column(name = "supplier_email")
    private String supplier_email;

    @Column(name = "phone_number")
    private String phone_number;

    @Column(name = "supplier_address")
    private String supplier_address;

    public Supplier() {}


    public Supplier(int supplier_id, String supplier_name, String contact_person, String supplier_email, String phone_number, String supplier_address) {
        this.supplier_id = supplier_id;
        this.supplier_name = supplier_name;
        this.contact_person = contact_person;
        this.supplier_email = supplier_email;
        this.phone_number = phone_number;
        this.supplier_address = supplier_address;
    }


    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
    }

    public String getSupplier_name() {
        return supplier_name;
    }

    public void setSupplier_name(String supplier_name) {
        this.supplier_name = supplier_name;
    }

    public String getContact_person() {
        return contact_person;
    }

    public void setContact_person(String contact_person) {
        this.contact_person = contact_person;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getSupplier_email() {
        return supplier_email;
    }

    public void setSupplier_email(String supplier_email) {
        this.supplier_email = supplier_email;
    }

    public String getSupplier_address() {
        return supplier_address;
    }

    public void setSupplier_address(String supplier_address) {
        this.supplier_address = supplier_address;
    }
}
