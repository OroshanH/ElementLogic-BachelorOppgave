package oslomet.emanager.outbound;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import oslomet.emanager.inbound.Inbound;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Map<String, Object>> slettOutbound(@PathVariable int extorderid) {
        Map<String, Object> result = rep.slettOutbound(extorderid);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/slettAlleOutbound")
    public void slettAlleInbound() {
        rep.slettAlle();
    }



}
