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
        String sql = "MERGE INTO Stock s " +
                "USING (VALUES (?, ?)) AS vals(quantity, produktid) " +
                "ON s.produktid = vals.produktid " +
                "WHEN MATCHED THEN UPDATE SET s.quantity = s.quantity + vals.quantity " +
                "WHEN NOT MATCHED THEN INSERT (quantity, produktid) VALUES (vals.quantity, vals.produktid)";

        db.update(sql, stock.getQuantity(), stock.getProduktid());
    }


    public List<Produkt> hentStock() {
        String sql = "SELECT * FROM Stock";
        List<Produkt> alleStock = db.query(sql,new BeanPropertyRowMapper(Stock.class));
        return alleStock;
    }



}
