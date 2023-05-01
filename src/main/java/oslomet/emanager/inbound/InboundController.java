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

    @PostMapping("/lagreInboundMock")
    public void lagreInboundMock(Inbound innInbound){rep.lagreInboundMock(innInbound);}
    @GetMapping("/hentAlleInbound")
    public List<Inbound> hentAlleInbound(){return rep.hentAlleInbound();}

    @GetMapping("/hentAlleInboundMock")
    public List<Inbound> hentAlleInboundMock(){return rep.hentAlleInboundMock();}

    @PutMapping("/oppdaterStatus/{produktid}")
    public void oppdaterStatus(@PathVariable int produktid) {
        rep.oppdaterStatus(produktid);
    }

    @DeleteMapping("/slettInbound/{id}")
    public void slettInbound(@PathVariable int id) {
        rep.slettInbound(id);
    }

    @DeleteMapping("/slettAlleInbound")
    public void slettAlleInbound() {
        rep.slettAlle();
    }



}
