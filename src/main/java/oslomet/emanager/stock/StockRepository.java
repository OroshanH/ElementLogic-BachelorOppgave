package oslomet.emanager.stock;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import oslomet.emanager.produkt.Produkt;

import java.util.List;

@Repository
public class StockRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreStock(Stock stock) {
        String sql = "INSERT INTO Stock (quantity, produktid) VALUES (?, ?) " +
                "ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)";

        db.update(sql, stock.getQuantity(), stock.getProduktid());
    }

    public List<Produkt> hentStock() {
        String sql = "SELECT * FROM Stock";
        List<Produkt> alleStock = db.query(sql,new BeanPropertyRowMapper(Stock.class));
        return alleStock;
    }

    public void lagreQuantityOut(Stock stock) {
        String sql = "UPDATE Stock SET quantityOut = quantityOut + ? WHERE produktid = ?";
        db.update(sql, stock.getQuantityOut(), stock.getProduktid());
    }

    public void updateQuantityOut(int quantity, int produktid) {
        String sql = "UPDATE Stock SET quantityOut = quantityOut - ? WHERE produktid = ?";
        db.update(sql, quantity, produktid);
    }

    public void slettStock (int id) {
        String sql = "DELETE FROM Stock WHERE id = ?";
        db.update(sql, id);
    }
}
