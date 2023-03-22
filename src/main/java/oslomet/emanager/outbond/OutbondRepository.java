package oslomet.emanager.outbond;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OutbondRepository {

    @Autowired
    private JdbcTemplate db;


    public void lagreOutbond(Outbond outbond){
        String sql = "INSERT INTO Outbond (quantity,produktid,extpicklistid,extorderid,extorderlineid,status) VALUES(?,?,?,?,?,?)";
        db.update(sql,outbond.getQuantity(),outbond.getProduktid(),outbond.getExtpicklistid(),outbond.getExtorderid(),outbond.getExtorderlineid(),outbond.getStatus());
    }
}
