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
        String sql = "INSERT INTO Inbound (quantity, produktid, purchaseorderid, purchaseorderlineid, status) VALUES (?, ?, ?, ?, ?) ";
        db.update(sql, inbound.getQuantity(), inbound.getProduktid(), inbound.getPurchaseorderid(), inbound.getPurchaseorderlineid(), inbound.getStatus());
    }

    public void lagreInboundMock(Inbound inbound) {
        String sql = "INSERT INTO InboundMock (quantity, produktid, purchaseorderid, purchaseorderlineid, status) VALUES (?, ?, ?, ?, ?) ";
        db.update(sql, inbound.getQuantity(), inbound.getProduktid(), inbound.getPurchaseorderid(), inbound.getPurchaseorderlineid(), inbound.getStatus());
    }

    public List<Inbound> hentAlleInbound(){
        String sql = "SELECT * FROM Inbound";
        List<Inbound> alleInbound = db.query(sql,new BeanPropertyRowMapper(Inbound.class));
        return alleInbound;
    }

    public List<Inbound> hentAlleInboundMock(){
        String sql = "SELECT * FROM InboundMock";
        List<Inbound> alleInbound = db.query(sql,new BeanPropertyRowMapper(Inbound.class));
        return alleInbound;
    }
    public void oppdaterStatus(int produktid) {
        String sql = "UPDATE Inbound SET status = 'Sendt' WHERE produktid = ?";
        db.update(sql, produktid);
    }

    public void slettInbound (int id) {
        String sql = "DELETE FROM InboundMock WHERE id = ?";
        db.update(sql, id);
    }
    public void slettAlle () {
        String sql = "DELETE FROM Inbound";
        db.update(sql);
    }

}

