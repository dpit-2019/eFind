package ro.dpit.efind.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrizaController {
    @RequestMapping("/getPriza")
    public Priza getDetails(@RequestParam(value="id") Long id){
        Priza res=new Priza();
        res.setID(id);
        res.setNume("Crocodilu");
        res.setTip(1);
        res.setStrada("strada buevard");
        res.setDescriere("aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaa a a a a a a a a a a a  a a a a a a a a a a a a a a a a a a a a a a a a a a a  a a a a a a a a a a a  a a a a a a a  a a aa  aaaaa a a a a a a a aaaaa aaaaa ");
        return res;
    }

}
