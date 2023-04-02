package oslomet.emanager.constant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Constant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int x;

    private int y;
    private int z;

    public Constant(){
    }

    public Constant(int id, int x, int y,int z){
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public int getId(){return id;}

    public void setId(int id){this.id = id;}

    public int getX(){return x;}

    public void setX(int x){this.x = x;}

    public int getY(){return y;}

    public void setY(int y){this.y = y;}

    public int getZ(){return z;}

    public void setZ(int z){this.z = z;}


}
