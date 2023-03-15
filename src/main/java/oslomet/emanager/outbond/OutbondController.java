package oslomet.emanager.outbond;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OutbondController {

    @Autowired
    OutbondRepository rep;

    @PostMapping("/sendOutbond")
    public void sendOrder(Outbond innOutbond){rep.sendOutbond(innOutbond);}

}
