package ro.dpit.efind.service;

public class Prize {
    public int[] id = new int[150] ;
    public String[] Nume = new String[150] ;
    public int[] tip = new int[150]  ;
    public String[] Descriere =new String[150];
    public double[] lat = new double[150];
    public double[] lng = new double[150];
    public int[] pending= new int[150];

    public int[] getPending() {
        return pending;
    }

    public void setPending(int[] pending) {
        this.pending = pending;
    }

    public int[] getId() {
        return id;
    }

    public void setId(int[] id) {
        this.id = id;
    }

    public String[] getNume() {
        return Nume;
    }

    public void setNume(String[] nume) {
        Nume = nume;
    }

    public int[] getTip() {
        return tip;
    }

    public void setTip(int[] tip) {
        this.tip = tip;
    }

    public String[] getDescriere() {
        return Descriere;
    }

    public void setDescriere(String[] descriere) {
        Descriere = descriere;
    }

    public double[] getLat() {
        return lat;
    }

    public void setLat(double[] lat) {
        this.lat = lat;
    }

    public double[] getLng() {
        return lng;
    }

    public void setLng(double[] lng) {
        this.lng = lng;
    }
}
