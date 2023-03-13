package oslomet.emanager.stock;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity;
    private int produktid;

    public Stock(){
    }

    public Stock(int id, int quantity, int produktid){
        this.id = id;
        this.quantity = quantity;
        this.produktid = produktid;
    }

    public int getId(){return id;}

    public void setId(int id){this.id = id;}

    public int getQuantity(){return quantity;}

    public void setQuantity(int quantity){this.quantity = quantity;}

    public int getProduktid(){return produktid;}

    public void setProduktid(int produktid){this.produktid = produktid;}




}
