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

    public void lagreInbound(Inbound inbound){
        String sql = "INSERT INTO Inbound (quantity,produktid) VALUES(?,?)";
        db.update(sql,inbound.getQuantity(),inbound.getProduktid());
    }

    public List<Inbound> hentAlleInbound(){
        String sql = "SELECT * FROM Inbound";
        List<Inbound> alleInbound = db.query(sql,new BeanPropertyRowMapper(Inbound.class));
        return alleInbound;
    }

}
