import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// make this class a controller
@Controller
public class HomeController {
    @RequestMapping("/")
    public String Index() {
        return "index.html";
    }
}
