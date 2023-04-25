package oslomet.emanager.outbound;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import oslomet.emanager.inbound.Inbound;

import java.util.List;

@RestController
public class OutboundController {

    @Autowired
    OutboundRepository rep;

    @PostMapping("/lagreOutbound")
    public void lagreOutbound(Outbound innOutbound){rep.lagreOutbound(innOutbound);}

    @GetMapping("/hentAlleOutbound")
    public List<Outbound> hentAlleOutbound(){return rep.hentAlleOutbound();}




    @GetMapping("/hentAlleOutboundMock")
    public List<Outbound> hentAlleOutboundMock(){return rep.hentAlleOutboundMock();}

    @GetMapping("/hentOutboundMedExtOrderlineID/{extpicklistid}")
    public List<Outbound> hentOutboundMedExtOrderlineID(@PathVariable int extpicklistid){
        return rep.hentOutboundMedExtOrderlineID(extpicklistid);
    }
    @DeleteMapping("/slettOutbound/{extorderid}")
    public void slettOutbound(@PathVariable int extorderid) {
        rep.slettOutbound(extorderid);
    }

}
