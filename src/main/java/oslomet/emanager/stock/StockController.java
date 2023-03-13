package oslomet.emanager.stock;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import oslomet.emanager.produkt.Produkt;

import java.util.List;

@RestController
public class StockController {

    @Autowired
    StockRepository rep;

    @PostMapping("/lagreStock")
    public void lagreStock(Stock innStock){rep.lagreStock(innStock);}
    @GetMapping("/hentStock")
    public List<Produkt> hentStock(){
        return rep.hentStock();
    }


}
