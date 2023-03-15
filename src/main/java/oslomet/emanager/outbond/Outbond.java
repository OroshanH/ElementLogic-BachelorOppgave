package oslomet.emanager.outbond;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Outbond {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity;
    private int produktid;
    private String extpicklistid;
    private String extorderid;
    private String extorderlineid;
    private String status;

    public Outbond(){}

    public Outbond(int id, int quantity, int produktid, String extpicklistid, String extorderid, String extorderlineid, String status){
        this.id = id;
        this.quantity = quantity;
        this.produktid = produktid;
        this.extpicklistid = extpicklistid;
        this.extorderid = extorderid;
        this.extorderlineid = extorderlineid;
        this.status = status;
    }

    public int getId(){return id;}
    public void setId(int id){this.id = id;}

    public int getQuantity(){return quantity;}
    public void setQuantity(int quantity){this.quantity = quantity;}

    public int getProduktid(){return produktid;}
    public void setProduktid(int produktid){this.produktid = produktid;}

    public String getExtpicklistid(){return extpicklistid;}
    public void setExtpicklistid(String extpicklistid){this.extpicklistid = extpicklistid;}


    public String getExtoderid(){return extorderid;}
    public void setExtorderid(String extorderid){this.extorderid = extorderid;}

    public String getExtoderlineid(){return extorderlineid;}
    public void setExtorderlineid(String extorderlineid){this.extorderlineid = extorderlineid;}

    public String getStatus(){return status;}
    public void setStatus(String status){this.status = status;}
}
