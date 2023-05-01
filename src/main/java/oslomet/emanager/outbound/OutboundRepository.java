package oslomet.emanager.outbound;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import oslomet.emanager.inbound.Inbound;

import java.util.List;
import java.util.Map;

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


    public List<Outbound> hentAlleOutboundMock(){
        String sql = "SELECT * FROM OutboundMock";
        List<Outbound> alleOutbound = db.query(sql,new BeanPropertyRowMapper(Outbound.class));
        return alleOutbound;
    }
    public List<Outbound> hentOutboundMedExtOrderlineID(int extpicklistid){
        String sql = "SELECT * FROM Outbound WHERE extpicklistid = ?";
        List<Outbound> outboundList = db.query(sql, new Object[]{extpicklistid}, new BeanPropertyRowMapper<>(Outbound.class));
        return outboundList;
    }
    public Map<String, Object> slettOutbound(int id) {
        String sql = "SELECT quantity, produktid FROM Outbound WHERE extorderid = ?";
        Map<String, Object> result = db.queryForMap(sql, id);
        db.update("DELETE FROM Outbound WHERE extorderid = ?", id);
        return result;
    }


    public void slettAlle () {
        String sql = "DELETE FROM Outbound";
        db.update(sql);
    }


}
