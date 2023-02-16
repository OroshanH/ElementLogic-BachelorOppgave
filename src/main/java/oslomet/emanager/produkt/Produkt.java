package oslomet.emanager.produkt;


public class Produkt {
    private int id;

    private int produktid;
    private String navn;
    private String beskrivelse;

    public Produkt(){
    }

    public Produkt(int id, int produktid,String navn, String beskrivelse){
        this.id = id;
        this.produktid=produktid;
        this.navn = navn;
        this.beskrivelse = beskrivelse;
    }

    public int getId(){return id;}

    public void setId(int id){this.id = id;}

    public int getProduktid(){return produktid;}

    public void setProduktid(int produktid){this.produktid = produktid;}

    public String getNavn(){return navn;}

    public void setNavn(String navn){this.navn = navn;}

    public String getBeskrivelse(){return beskrivelse;}

    public void setBeskrivelse(String beskrivelse){this.beskrivelse = beskrivelse;}





}
