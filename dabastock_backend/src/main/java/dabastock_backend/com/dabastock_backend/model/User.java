package dabastock_backend.com.dabastock_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int user_id;
    @Column(name="user_name")
    private String user_name;
    @Column(name="user_email")
    private String user_email;
    @Column(name="user_password")
    private String user_password;
    @Column(name="user_id_iden")
    private String user_id_iden;

    public User(int user_id, String user_name, String user_email, String user_password, String user_id_iden) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_id_iden = user_id_iden;
    }
    public User() {}

    public String getUser_id_iden() {
        return user_id_iden;
    }

    public void setUser_id_iden(String user_id_iden) {
        this.user_id_iden = user_id_iden;
    }


    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }
}
