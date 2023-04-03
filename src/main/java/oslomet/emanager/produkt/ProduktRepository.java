package oslomet.emanager.produkt;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public class ProduktRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreProdukt(Produkt produkt) {
        String sql = "INSERT INTO Produkt (produktid,navn,beskrivelse) VALUES(?,?,?)";
        db.update(sql,produkt.getProduktid(),produkt.getNavn(),produkt.getBeskrivelse());
    }

    public List<Produkt> hentAlleProdukter() {
        String sql = "SELECT * FROM Produkt";
        List<Produkt> alleProdukter = db.query(sql,new BeanPropertyRowMapper(Produkt.class));
        return alleProdukter;
    }

    public void slettAlleProdukter (int id) {
        String sql = "DELETE FROM Produkt WHERE id = ?";
        db.update(sql, id);
    }

}
