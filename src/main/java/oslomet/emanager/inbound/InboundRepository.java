package oslomet.emanager.inbound;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InboundRepository {

    @Autowired
    private JdbcTemplate db;


    public void lagreInbound(Inbound inbound) {
        String sql = "INSERT INTO Inbound (quantity, produktid, purchaseorderid, purchaseorderlineid, status) VALUES (?, ?, ?, ?, ?) " +
                "ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity), purchaseorderid = VALUES(purchaseorderid), purchaseorderlineid = VALUES(purchaseorderlineid), status = VALUES(status)";
        db.update(sql, inbound.getQuantity(), inbound.getProduktid(), inbound.getPurchaseorderid(), inbound.getPurchaseorderlineid(), inbound.getStatus());
    }



    public List<Inbound> hentAlleInbound(){
        String sql = "SELECT * FROM Inbound";
        List<Inbound> alleInbound = db.query(sql,new BeanPropertyRowMapper(Inbound.class));
        return alleInbound;
    }

}
