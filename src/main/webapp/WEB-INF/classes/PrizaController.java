package eFind;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrizaController {
    @RequestMapping("/dadate")
    public Priza getDetails(@RequestParam(value="id") Long id){
        Priza res=new Priza();
        res.setId(id);
        res.setName("Crocodilu");
        return res;
    }

}
