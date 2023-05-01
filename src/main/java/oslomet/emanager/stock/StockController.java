package oslomet.emanager.stock;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/lagreQuantityOut")
    public void lagreQuantityOut(Stock innStock){rep.lagreQuantityOut(innStock);}

    @PostMapping("/updateQuantityOut")
    public void updateQuantityOut(@RequestParam int quantity, @RequestParam int produktid) {
        rep.updateQuantityOut(quantity, produktid);
    }

    @DeleteMapping("/slettStock/{id}")
    public void slettStock(@PathVariable int id) {
        rep.slettStock(id);
    }

}
