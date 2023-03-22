package oslomet.emanager.outbond;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OutbondController {

    @Autowired
    OutbondRepository rep;

    @PostMapping("/lagreOutbond")
    public void lagreOutbond(Outbond innOutbond){rep.lagreOutbond(innOutbond);}
}
