package oslomet.emanager.constant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import oslomet.emanager.produkt.Produkt;
import oslomet.emanager.stock.Stock;
import oslomet.emanager.stock.StockRepository;

import java.util.List;

@RestController
public class ConstantController {
    @Autowired
    ConstantRepository rep;

    @PostMapping("/lagreConstant")
    public void lagreConstant(Constant innConstant){rep.lagreConstant(innConstant);}
    @GetMapping("/hentConstant")
    public List<Produkt> hentConstant(){
        return rep.hentConstant();
    }

    @PostMapping("/oppdaterConstant")
    public void oppdaterConstant(@RequestParam int x, @RequestParam int y) {
        rep.oppdaterConstant(x, y);
    }




}
