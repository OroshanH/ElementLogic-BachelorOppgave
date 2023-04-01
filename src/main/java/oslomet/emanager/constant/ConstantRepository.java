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

    public void lagreConstant(Constant constant) {
        String sql = "INSERT INTO Constant (x) VALUES (?)";


        db.update(sql, constant.getX());
    }



    public List<Produkt> hentConstant() {
        String sql = "SELECT * FROM Constant";
        List<Produkt> alleConstant = db.query(sql,new BeanPropertyRowMapper(Constant.class));
        return alleConstant;
    }

    public void oppdaterConstant(int x, int y) {
        String sql = "UPDATE Constant SET x = ?, y = ? WHERE id = ?";
        db.update(sql, x, y, 1);
    }






}
