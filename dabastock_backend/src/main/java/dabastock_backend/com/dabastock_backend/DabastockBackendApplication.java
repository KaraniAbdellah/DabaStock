package dabastock_backend.com.dabastock_backend;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Enablmit eEncryptableProperties
public class DabastockBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(DabastockBackendApplication.class, args);
		System.out.println("Application Running Successfully");
	}
}
