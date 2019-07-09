package ro.dpit.efind.service;

public class Priza {
    private String Nume;
    private String Strada;
    private String url;
    private int Tip;
    private String Descriere;
    private long ID;

    public String getNume() {
        return Nume;
    }

    public void setNume(String nume) {
        Nume = nume;
    }

    public String getStrada() {
        return Strada;
    }

    public void setStrada(String strada) {
        Strada = strada;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getTip() {
        return Tip;
    }

    public void setTip(int tip) {
        Tip = tip;
    }

    public String getDescriere() {
        return Descriere;
    }

    public void setDescriere(String descriere) {
        Descriere = descriere;
    }

    public long getID() {
        return ID;
    }

    public void setID(long ID) {
        this.ID = ID;
    }
}
