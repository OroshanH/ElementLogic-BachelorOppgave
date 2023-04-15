package oslomet.emanager.outbound;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import oslomet.emanager.inbound.Inbound;

import java.util.List;

@Repository
public class OutboundRepository {

    @Autowired
    private JdbcTemplate db;


    public void lagreOutbound(Outbound outbound){
        String sql = "INSERT INTO Outbound (quantity,produktid,extpicklistid,extorderid,extorderlineid,status) VALUES(?,?,?,?,?,?)";
        db.update(sql,outbound.getQuantity(),outbound.getProduktid(),outbound.getExtpicklistid(),outbound.getExtorderid(),outbound.getExtorderlineid(),outbound.getStatus());
    }


    public List<Outbound> hentAlleOutbound(){
        String sql = "SELECT * FROM Outbound";
        List<Outbound> alleOutbound = db.query(sql,new BeanPropertyRowMapper(Outbound.class));
        return alleOutbound;
    }



}
