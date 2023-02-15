package oslomet.emanager;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleProdukter();
    }
}
