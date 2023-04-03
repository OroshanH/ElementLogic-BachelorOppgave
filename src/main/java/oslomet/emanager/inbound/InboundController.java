package oslomet.emanager.inbound;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InboundController {

    @Autowired
    InboundRepository rep;

    @PostMapping("/lagreInbound")
    public void lagreInbound(Inbound innInbound){rep.lagreInbound(innInbound);}

    @GetMapping("/hentAlleInbound")
    public List<Inbound> hentAlleInbound(){return rep.hentAlleInbound();}

    @PutMapping("/oppdaterStatus/{produktid}")
    public void oppdaterStatus(@PathVariable int produktid) {
        rep.oppdaterStatus(produktid);
    }


}
