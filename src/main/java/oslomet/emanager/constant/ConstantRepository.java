package oslomet.emanager.constant;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import oslomet.emanager.produkt.Produkt;
import oslomet.emanager.stock.Stock;

import java.util.List;

@Repository
public class ConstantRepository {

    @Autowired
    private JdbcTemplate db;

    public List<Produkt> hentConstant() {
        String sql = "SELECT * FROM Constant";
        List<Produkt> alleConstant = db.query(sql,new BeanPropertyRowMapper(Constant.class));
        return alleConstant;
    }

    public void oppdaterX(int x) {
        String sql = "UPDATE Constant SET x = ? WHERE id = ?";
        db.update(sql, x, 1);
    }

    public void oppdaterY(int y) {
        String sql = "UPDATE Constant SET y = ? WHERE id = ?";
        db.update(sql, y, 1);
    }






}
