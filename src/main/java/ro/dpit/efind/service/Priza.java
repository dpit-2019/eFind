package ro.dpit.efind.service;

public class Priza {
    private String name;
    private long id;
    private long tip;
    private String Descriere;
    private double lat;
    private double lng;
    private int pending;
    private int reports;
    private int total_prize;
    private int prize_ocupate;
    private int favorite;
    private int ora_inchidere;

    public int getTotal_prize() {
        return total_prize;
    }

    public void setTotal_prize(int total_prize) {
        this.total_prize = total_prize;
    }

    public int getPrize_ocupate() {
        return prize_ocupate;
    }

    public void setPrize_ocupate(int prize_ocupate) {
        this.prize_ocupate = prize_ocupate;
    }

    public int getFavorite() {
        return favorite;
    }

    public void setFavorite(int favorite) {
        this.favorite = favorite;
    }

    public int getOra_inchidere() {
        return ora_inchidere;
    }

    public void setOra_inchidere(int ora_inchidere) {
        this.ora_inchidere = ora_inchidere;
    }

    public int getPending() {
        return pending;
    }

    public void setPending(int pending) {
        this.pending = pending;
    }

    public int getReports() {
        return reports;
    }

    public void setReports(int reports) {
        this.reports = reports;
    }

    public String getDescriere() {
        return Descriere;
    }

    public void setDescriere(String descriere) {
        Descriere = descriere;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTip() {
        return tip;
    }

    public void setTip(long tip) {
        this.tip = tip;
    }
}
