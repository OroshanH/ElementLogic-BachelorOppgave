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


    @GetMapping("/hentConstant")
    public List<Produkt> hentConstant(){
        return rep.hentConstant();
    }

    @PostMapping("/oppdaterX")
    public void oppdaterX(@RequestParam int x) {
        rep.oppdaterX(x);
    }

    @PostMapping("/oppdaterY")
    public void oppdaterY(@RequestParam int y) {
        rep.oppdaterY(y);
    }

   @PostMapping("/oppdaterZ")
    public void oppdaterZ(@RequestParam int z) {
        rep.oppdaterZ(z);
    }




}
