package oslomet.emanager;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProduktController {

    @Autowired
    ProduktRepository rep;

    @PostMapping("/lagre")
    public void lagreProdukt(Produkt innProdukt){
        rep.lagreProdukt(innProdukt);
    }
    @GetMapping("/hentAlle")
    public List<Produkt> hentAlle(){
        return rep.hentAlleProdukter();
    }

    @DeleteMapping("/slettProdukt/{id}")
    public void slettProdukt(@PathVariable int id) {
        rep.slettAlleProdukter(id);
    }
}
