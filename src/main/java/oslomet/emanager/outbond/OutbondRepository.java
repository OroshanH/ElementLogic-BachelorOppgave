package oslomet.emanager.outbond;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OutbondRepository {

    @Autowired
    private JdbcTemplate db;


    public void sendOutbond(Outbond outbond){

    }
}
