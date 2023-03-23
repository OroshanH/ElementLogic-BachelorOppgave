package oslomet.emanager.outbound;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OutboundRepository {

    @Autowired
    private JdbcTemplate db;


    public void lagreOutbound(Outbound outbound){
        String sql = "INSERT INTO Outbound (quantity,produktid,extpicklistid,extorderid,extorderlineid,status) VALUES(?,?,?,?,?,?)";
        db.update(sql,outbound.getQuantity(),outbound.getProduktid(),outbound.getExtpicklistid(),outbound.getExtorderid(),outbound.getExtorderlineid(),outbound.getStatus());
    }
}
