package oslomet.emanager;


public class Produkt {
    private int id;
    private String navn;
    private String beskrivelse;

    public Produkt(){
    }

    public Produkt(int id, String navn, String beskrivelse){
        this.id = id;
        this.navn = navn;
        this.beskrivelse = beskrivelse;
    }

    public int getId(){return id;}

    public void setId(int id){this.id = id;}

    public String getNavn(){return navn;}

    public void setNavn(String navn){this.navn = navn;}

    public String getBeskrivelse(){return beskrivelse;}

    public void setBeskrivelse(String beskrivelse){this.beskrivelse = beskrivelse;}





}
