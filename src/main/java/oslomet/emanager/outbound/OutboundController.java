package oslomet.emanager.outbound;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OutboundController {

    @Autowired
    OutboundRepository rep;

    @PostMapping("/lagreOutbound")
    public void lagreOutbound(Outbound innOutbound){rep.lagreOutbound(innOutbound);}
}
